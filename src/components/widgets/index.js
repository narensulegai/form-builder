import React, {useContext, useState} from 'react';
import InputBox from "./InputBox";
import PropTypes from 'prop-types'
import Building from "./Building";
import {FormContext} from "../Form/FormContext";
import CustomWidget from "./CustomWidget";
import _ from 'lodash';

function Wd(props) {

  const key = props.item.name;
  const showOn = props.item.showOn ? props.item.showOn : () => true;

  const context = useContext(FormContext);
  const [value, setValue] = useState(context.getKeys()[key]);

  const onChange = (val) => {
    context.setKey(key, val)
  };
  //TODO:remove callback on unmount
  context.onChange((keys) => {
    setValue(keys[key]);
  });
  return React.createElement(props.Widget, {value, onValueChange: onChange, ...props.item.options});
}

const wrapWidgets = (widgets) => {
  const wrappedWidgets = {};
  for (let key in widgets) {
    const Widget = widgets[key];
    wrappedWidgets[key] = (item) => {
      return <Wd item={item} Widget={Widget}/>;
    }
  }
  return wrappedWidgets;
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
  },
  CustomWidgetName: (props) => {
    return <CustomWidget onChange={props.onValueChange} {...props} />
  }
};

export default wrapWidgets(widgets);