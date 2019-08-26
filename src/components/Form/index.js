import React from 'react';
import FormGen from "../FormGen";
import PropTypes from 'prop-types';
import FormContext from "./FormContext";

Form.propTypes = {
  content: PropTypes.any,
  init: PropTypes.any,
  onChange: PropTypes.func
};

function Form(props) {

  const formContext = new FormContext(props.init);
  formContext.onChange((tree) => {
    props.onChange(tree);
  });

  return (
    <FormGen formContext={formContext}
             content={props.content}
             level={[props.content.name]}/>
  );
}

export default Form;