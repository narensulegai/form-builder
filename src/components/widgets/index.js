import React, {useState} from 'react';
import InputBox from "./InputBox";
import PropTypes from 'prop-types'
import Building from "./Building";

const ConditionalRender = function ({widget, item, level, context}) {
  const hideIf = item.hideIf ? item.hideIf : () => false;

  const [isVisible, setVisibility] = useState(!hideIf(context.getData()));
  //TODO: remove listener when component un-mounts
  context.onChange((data) => {
    setVisibility(!hideIf(data));
  });

  const onChange = (val) => {
    context.setValue(level, val);
  };
  const text = context.getValue(level);

  const newWidget = React.cloneElement(widget(text, onChange), {...item.options});

  return isVisible ? newWidget : null;
};

ConditionalRender.propTypes = {};

ConditionalRender.defaultProps = {};

const wrapWidgets = (widgets) => {
  const wrappedWidgets = {};
  for (let key in widgets) {
    const widget = widgets[key];
    wrappedWidgets[key] = (item, index, level, context) => {
      return <ConditionalRender key={index}
                                level={level}
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