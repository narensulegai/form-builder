import React, {useContext, useEffect, useState} from 'react';
import InputBox from "./InputBox";
import {FormContext} from "../Form/FormContext";
import _ from 'lodash';
import {customWidgets} from './../../services/settings';
import Form from "../Form";

function WidgetWrapper(props) {

  const key = props.item.name;
  const showOn = props.item.showOn ? props.item.showOn : () => true;
  const context = useContext(FormContext);
  const [value, setValue] = useState(context.getKeys()[key]);
  const [isVisible, setVisibility] = useState(showOn(context.getKeys()[key]));
  const onChange = (val) => {
    context.setKey(key, val)
  };
  //To fix a strange issue of input box losing focus when the outer component gets re-rendered
  //Try to fix using a timeout
  // if (!props.isCustom) {
  const callbackIndex = context.onChange((keys) => {
    setValue(keys[key]);
    setVisibility(showOn(context.getKeys()[key]));
  });
  // }
  useEffect(() => {
    return () => {
      context.deregister(callbackIndex);
    };
  });


  return isVisible ? React.createElement(props.Widget, {value, onValueChange: onChange, ...props.item.options}) : null;
}


function RepeatableWidgetWrapper(props) {
  const {index} = props;
  const showOn = props.item.showOn ? props.item.showOn : () => true;
  const context = useContext(FormContext);
  const value = context.getList()[index];
  const isVisible = showOn(context.getList(), index);

  const onChange = (val) => {
    context.setEle(val, index);
  };

  return isVisible ? React.createElement(props.Widget, {value, onValueChange: onChange, ...props.item.options}) : null;
}

const wrapWidgets = (widgets, isCustom = false) => {
  const wrappedWidgets = {};
  for (let key in widgets) {
    const Widget = widgets[key];
    wrappedWidgets[key] = (item) => {
      return item.isRepeatable
        ? <RepeatableWidgetWrapper item={item} isCustom={isCustom} Widget={Widget}/>
        : <WidgetWrapper item={item} isCustom={isCustom} Widget={Widget}/>
    }
  }
  return wrappedWidgets;
};

const wrapCustomWidgets = (customWidgets) => {
  const wrappedCustomWidgets = {};
  for (let key in customWidgets) {
    const content = customWidgets[key];
    wrappedCustomWidgets[key] = function (props) {
      return <Form content={content} init={props.value} onChange={props.onValueChange} {...props} />
    }
  }
  return wrapWidgets(wrappedCustomWidgets, true);
};

//Define your widgets here -
//value will contain the initialization value of the component,
//this value must be updated using onValueChange function
const widgets = {
  EmailInputBox: (props) => {
    return <InputBox text={props.value} pattern={'email'} onChange={props.onValueChange} {...props}/>;
  },
  InputBox: (props) => {
    return <InputBox text={props.value} pattern={'nonEmpty'} onChange={props.onValueChange} {...props}/>;
  },
  BuildingSummary: (props) => {
    console.log(props);
    if (props.value) {
      return <div>{props.value.BuildingDescription}</div>
    }
    return <div>Enter</div>;
  }
};

export default _.extend(wrapCustomWidgets(customWidgets), wrapWidgets(widgets));