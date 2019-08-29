import _ from 'lodash';
import React from "react";

export const formContext = function (data) {
  const callbacks = [];
  let keys = _.clone(data);

  this.getKeys = () => {
    return keys;
  };
  this.setKey = (key, val) => {
    keys[key] = val;
    callbacks.map(c => c(keys));
  };
  this.getKey = (key) => {
    return keys[key];
  };

  this.onChange = (callback) => {
    callbacks.push(callback);
  }
};

export const FormContext = React.createContext();
