import React from 'react';
import FormGen from "../FormGen";
import PropTypes from 'prop-types';
import FormContext from "./FormContext";
import {defaultData} from "../../services/settings/util";
import _ from 'lodash';

Form.propTypes = {
  content: PropTypes.any,
  init: PropTypes.any,
  onChange: PropTypes.func
};

function Form(props) {

  const data = _.extend(defaultData(props.content), props.init);

  const formContext = new FormContext(data);
  formContext.onChange((data) => {
    props.onChange(data);
  });

  return (
    <FormGen formContext={formContext}
             content={props.content}/>
  );
}

export default Form;