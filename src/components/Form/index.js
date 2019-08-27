import React from 'react';
import FormGen from "../FormGen";
import PropTypes from 'prop-types';
import FormContext from "./FormContext";
import {defaultData} from "../../services/settings/util";

Form.propTypes = {
  content: PropTypes.any,
  init: PropTypes.any,
  onChange: PropTypes.func
};

function Form(props) {
  const init = props.init ? props.init : defaultData(props.content);
  const formContext = new FormContext(init);
  formContext.onChange((data) => {
    props.onChange(data);
  });

  return (
    <FormGen formContext={formContext}
             content={props.content}/>
  );
}

export default Form;