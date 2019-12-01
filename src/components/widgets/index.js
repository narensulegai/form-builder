import React, {useContext, useEffect, useState} from 'react';
import {FormContext} from "../Form/FormContext";
import _ from 'lodash';
import {customWidgets} from './../../services/settings/tenants/tenant3';
import Form from "../Form";
import {widgets} from "./defaultWidgets";

/**
 * @return {null}
 */
function WidgetWrapper({item, Widget}) {
  //TODO:WidgetWrapper should not mount on every change
  const key = item.name;
  const showOn = item.showOn ? item.showOn : () => true;
  const context = useContext(FormContext);
  const keys = context.getKeys();
  const [value, setValue] = useState(keys[key]);
  const [isVisible, setVisibility] = useState(showOn(keys));

  useEffect(() => {
    const callbackIndex = context.onChange(keys => {
      console.log(keys, callbackIndex);
      setValue(keys[key]);
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
              onValueChange={onValueChange}
              onGlobalValueChange={onGlobalValueChange}
              options={item.options}/>
    : null;
}

/**
 * @return {null}
 */
function RepeatableWidgetWrapper({item, Widget, index}) {
  const showOn = item.showOn ? item.showOn : () => true;
  const context = useContext(FormContext);
  const [value, setValue] = useState(context.getList()[index]);
  const isVisible = showOn(context.getList(), index);

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

  return isVisible
    ? <Widget value={value}
              onValueChange={onValueChange}
              options={item.options}/>
    : null;
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
