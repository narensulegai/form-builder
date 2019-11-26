export const widgetContext = function () {
  let callbacks = [];
  let keys = {};

  return {
    getKeys: () => {
      return keys;
    },
    setKeys: (newKeys) => {
      keys = {...keys, ...newKeys};
      callbacks.forEach(c => c(keys));
    },
    setKey: (key, val) => {
      keys[key] = val;
      callbacks.forEach(c => c(keys, key));
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
  }
};


export const RepeatableWidgetContext = function () {
  let callbacks = [];
  let list = [];

  return {
    getList: () => {
      return list;
    },
    setListEle: (ele, i) => {
      list[i] = ele;
      callbacks.forEach(c => c(list, i));
    },
    onChange: (callback) => {
      callbacks = [...callbacks, callback];
      return callbacks.length - 1;
    },
    deregister: (index) => {
      callbacks[index] = () => {
      };
    }
  }
};
