import React, {useState} from 'react';
import InputBox from "./InputBox";
import PropTypes from 'prop-types'

const ConditionalRender = function ({widget, item, level, context}) {
  const hideIf = item.hideIf ? item.hideIf : () => false;

  const [isVisible, setVisibility] = useState(!hideIf(context.getData()));

  context.onChange((data) => {
    setVisibility(!hideIf(data));
  });

  const onChange = (val) => {
    context.setValue(level, val);
  };
  const text = context.getValue(level);

  const newWidget = React.cloneElement(widget, {text, onChange, ...item.options});

  return isVisible ? newWidget : null;
};

ConditionalRender.propTypes = {};

ConditionalRender.defaultProps = {};

export default {
  EmailInputBox: (item, index, level, context) => {
    //TODO: create wrapper with better abstraction

    return <ConditionalRender key={index}
                              level={level}
                              item={item}
                              context={context}
                              widget={<InputBox pattern={'email'}/>}/>

  },
  NonEmptyInputBox: (item, index, level, context) => {
    //TODO: create wrapper with better abstraction

    return <ConditionalRender key={index}
                              level={level}
                              item={item}
                              context={context}
                              widget={<InputBox pattern={'nonEmpty'}/>}/>

  }
};
