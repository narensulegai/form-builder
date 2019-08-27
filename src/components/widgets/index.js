import React, {useState} from 'react';
import InputBox from "./InputBox";
import PropTypes from 'prop-types'
import Building from "./Building";

const ConditionalRender = function ({widget, item, context}) {
  const key = item.name;
  const showOn = item.showOn ? item.showOn : () => true;

  const [isVisible, setVisibility] = useState(showOn(context.getKeys()));
  //TODO: remove listener when component un-mounts
  context.onChange((keys) => {
    setVisibility(showOn(keys));
  });

  const onChange = (val) => {
    context.setKey(key, val);
  };
  const text = context.getKey(key);

  const newWidget = React.cloneElement(widget(text, onChange), {...item.options});

  return isVisible ? newWidget : null;
};

ConditionalRender.propTypes = {};

ConditionalRender.defaultProps = {};

const wrapWidgets = (widgets) => {
  const wrappedWidgets = {};
  for (let key in widgets) {
    const widget = widgets[key];
    wrappedWidgets[key] = (item, index, context) => {
      return <ConditionalRender key={index}
                                item={item}
                                context={context}
                                widget={widget}/>;
    }
  }
  return wrappedWidgets;
};

//Define your widgets here -
//value will contain the initialization value of the component,
//this value must be updated using onValueChange function
const widgets = {
  EmailInputBox: (value, onValueChange) => {
    return <InputBox text={value} pattern={'email'} onChange={onValueChange}/>;
  },
  NonEmptyInputBox: (value, onValueChange) => {
    return <InputBox text={value} pattern={'nonEmpty'} onChange={onValueChange}/>;
  },
  Building:(value, onValueChange) => {
    return <Building init={value} onChange={onValueChange}/>
  }
};

export default wrapWidgets(widgets);