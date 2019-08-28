import React, {useState} from 'react';
import InputBox from "./InputBox";
import PropTypes from 'prop-types'
import Building from "./Building";

/**
 * @return {null}
 */
const withConditionalRender = function (item, index, context, Widget) {
  function Wd(props) {
    const key = item.name;

    const showOn = item.showOn ? item.showOn : () => true;
    const [isVisible, setVisibility] = useState(showOn(context.getKeys()));
    const [value, setValue] = useState(context.getKey(key));

    //TODO: remove listener when component un-mounts
    context.onChange((keys) => {
      setValue(keys[key]);
      setVisibility(showOn(keys));
    });

    const onChange = (val) => {
      context.setKey(key, val);
    };

    return isVisible ? <Widget value={value} onValueChange={onChange} context={context} {...item.options}/> : null;
  }

  return <Wd/>;
};

const wrapWidgets = (widgets) => {
  const wrappedWidgets = {};
  for (let key in widgets) {
    const Widget = widgets[key];
    wrappedWidgets[key] = (item, index, context) => {
      return withConditionalRender(item, index, context, Widget);
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
  NonEmptyInputBox: (props) => {
    return <InputBox text={props.value} pattern={'nonEmpty'} onChange={props.onValueChange} {...props}/>;
  },
  BuildingWidget: (props) => {
    return <Building
      value={props.value}
      onChange={props.onValueChange}
    />
  }
};

export default wrapWidgets(widgets);