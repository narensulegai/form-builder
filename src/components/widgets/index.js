import React, {useContext, useEffect, useState} from 'react';
import {FormContext} from "../Form/FormContext";
import _ from 'lodash';
import {customWidgets} from './../../services/settings/tenants/tenant2';
import Form from "../Form";
import {widgets} from "./defaultWidgets";

const FormulaParser = require('hot-formula-parser').Parser;

const evalShowOn = (showOn) => {
  if (typeof showOn === 'function') {
    return showOn;
  }
  if (typeof showOn === 'string') {
    return (args) => {
      const parser = new FormulaParser();
      parser.setFunction('LENGTH', (params) => {
        return params[0].length;
      });
      for (let key in args) {
        parser.setVariable(key, args[key]);
      }
      const res = parser.parse(showOn);
      if (res.error !== null) {
        console.error('Something went wrong while parsing formula', parser);
      }
      return res.result;
    }
  }
  return () => true;
};

/**
 * @return {null}
 */
function WidgetWrapper({item, Widget}) {
  //TODO:WidgetWrapper should not mount on every change
  const key = item.name;
  const showOn = evalShowOn(item.showOn);
  const context = useContext(FormContext);
  const keys = context.getKeys();
  const [value, setValue] = useState(keys[key]);
  const [globalValue, setGlobalValue] = useState(keys);
  const [isVisible, setVisibility] = useState(showOn(keys));

  useEffect(() => {
    const callbackIndex = context.onChange(keys => {
      setValue(keys[key]);
      setGlobalValue(keys);
      setVisibility(showOn(keys));
    });
    return () => {
      context.deregister(callbackIndex);
    };
  });

  const onValueChange = (val) => {
    context.setKey(key, val);
  };
  const onGlobalValueChange = (key, val) => {
    context.setKey(key, val);
  };

  return isVisible
    ? <Widget value={value}
              globalValue={globalValue}
              onValueChange={onValueChange}
              onGlobalValueChange={onGlobalValueChange}
              options={item.options}/>
    : null;
}

/**
 * @return {null}
 */
function RepeatableWidgetWrapper({item, Widget, index}) {
  const context = useContext(FormContext);
  const [value, setValue] = useState(context.getList()[index]);

  useEffect(() => {
    const callbackIndex = context.onChange((list) => {
      setValue(list[index]);
    });

    return () => {
      context.deregister(callbackIndex);
    };
  });

  const onValueChange = (val) => {
    context.setEle(val, index);
  };

  return <Widget value={value}
                 onValueChange={onValueChange}
                 options={item.options}/>
}

const wrapWidgets = (widgets) => {
  const wrappedWidgets = {};
  for (const key in widgets) {
    const Widget = widgets[key];
    wrappedWidgets[key] = (item) => {
      return item.isRepeatable === true
        ? <RepeatableWidgetWrapper item={item} Widget={Widget}/>
        : <WidgetWrapper item={item} Widget={Widget}/>
    }
  }
  return wrappedWidgets;
};

const wrapCustomWidgets = (customWidgets) => {
  const wrappedCustomWidgets = {};
  for (const key in customWidgets) {
    const content = customWidgets[key];
    wrappedCustomWidgets[key] = function (props) {
      return <Form content={content} init={props.value} onChange={props.onValueChange} {...props} />
    }
  }
  return wrapWidgets(wrappedCustomWidgets, true);
};

const allWidgets = _.extend(wrapCustomWidgets(customWidgets), wrapWidgets(widgets));
export default allWidgets;
