import React from 'react';
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

  let keys = _.extend(defaultData(props.content), props.init);
  let callbacks = [];

  return (
    <FormContext.Provider value={{
      getKeys: function () {
        return keys;
      },
      setKeys: function (newKeys) {
        keys = {...keys, ...newKeys};
        callbacks.forEach(c => c(keys));
        props.onChange(keys);
      },
      setKey: function (key, val) {
        keys[key] = val;
        callbacks.forEach(c => c(keys, key));
        props.onChange(keys);
      },
      onChange: (callback) => {
        callbacks = [...callbacks, callback];
        return callbacks.length - 1;
      },
      deregister: (index) => {
        //TODO:use map instead
        callbacks[index] = () => {
        };
      }
    }}>
      <FormGen content={props.content}/>
    </FormContext.Provider>
  );
}

export default Form;
