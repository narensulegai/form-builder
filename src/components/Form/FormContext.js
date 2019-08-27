import _ from 'lodash';

export default function (data) {
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
}