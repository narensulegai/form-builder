import _ from 'lodash';

export default function () {
  let tree = {};
  const callbacks = [];

  this.setValue = (level, val) => {
    _.set(tree, level.join('.'), val);
    callbacks.map(c => c(tree));
  };

  this.onChange = (callback) => {
    callbacks.push(callback);
  }
}