import _ from 'lodash';

export default function (data) {
  let tree = _.cloneDeep(data);
  const callbacks = [];

  this.getData = () => {
    return tree;
  };
  this.setValue = (level, val) => {
    _.set(tree, level.join('.'), val);
    callbacks.map(c => c(tree));
  };

  this.getValue = (level) => {
    return _.get(tree, level.join('.'));
  };

  this.onChange = (callback) => {
    callbacks.push(callback);
  }
}