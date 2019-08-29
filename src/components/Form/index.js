import React, {useState} from 'react';
import FormGen from "../FormGen";
import PropTypes from 'prop-types';
import {FormContext} from "./FormContext";
import {defaultData} from "../../services/settings/util";
import _ from 'lodash';

Form.propTypes = {
  content: PropTypes.any,
  init: PropTypes.any,
  onChange: PropTypes.func
};

function Form(props) {

  const keys = _.extend(defaultData(props.content), props.init);
  let callbacks = [];

  return (
    <FormContext.Provider value={{
      getKeys: function () {
        return keys;
      },
      setKey: function (key, val) {
        keys[key] = val;
        callbacks.forEach(c => c(keys, key));
        props.onChange(keys);
      },
      onChange: (callback) => {
        callbacks = [...callbacks, callback];
      }
    }}>
      <FormGen content={props.content}/>
    </FormContext.Provider>
  );
}

export default Form;