import React, {useContext, useState} from 'react';
import InputBox from "./InputBox";
import PropTypes from 'prop-types'
import Building from "./Building";
import {FormContext} from "../Form/FormContext";
import CustomWidget from "./CustomWidget";
import _ from 'lodash';
import {customWidgets} from './../../services/settings';

function Wd(props) {

  const key = props.item.name;
  const showOn = props.item.showOn ? props.item.showOn : () => true;
  const context = useContext(FormContext);
  const [value, setValue] = useState(context.getKeys()[key]);
  const [isVisible, setVisibility] = useState(showOn(context.getKeys()[key]));

  const onChange = (val) => {
    context.setKey(key, val)
  };
  //TODO:remove callback on unmount
  if (!props.isCustom) { //To fix a strange issue of input box losing focus when the outer component gets re-rendered
    context.onChange((keys) => {
      setValue(keys[key]);
      setVisibility(showOn(context.getKeys()[key]));
    });
  }
  return isVisible ? React.createElement(props.Widget, {value, onValueChange: onChange, ...props.item.options}) : null;
}

const wrapWidgets = (widgets, isCustom = false) => {
  const wrappedWidgets = {};
  for (let key in widgets) {
    const Widget = widgets[key];
    wrappedWidgets[key] = (item) => {
      return <Wd item={item} isCustom={isCustom} Widget={Widget}/>;
    }
  }
  return wrappedWidgets;
};

const wrapCustomWidgets = (customWidgets) => {
  const wrappedCustomWidgets = {};
  for (let key in customWidgets) {
    const content = customWidgets[key];
    wrappedCustomWidgets[key] = function (props) {
      return <CustomWidget content={content} init={props.value} onChange={props.onValueChange} {...props} />
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
    return <Building value={props.value} onChange={props.onValueChange} {...props} />
  }
};

export default _.extend(wrapCustomWidgets(customWidgets), wrapWidgets(widgets));