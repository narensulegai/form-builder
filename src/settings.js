import _ from 'lodash';

export const content = {
  name: 'main',
  container: 'row',
  items: [
    {
      widget: 'NonEmptyInputBox',
      options: {label: 'Name'},
    },
    {
      content: {
        name: 'columns',
        container: 'col',
        items: [
          {
            widget: 'NonEmptyInputBox',
            options: {label: 'Name'},
            hideIf: (data) => {
              return data.main[0] === null;
            }
          }
        ]
      }
    }
  ]
};

const defaultData = (content) => {
  let data = {};
  const initContent = (level, content) => {
    const name = content.name;
    content.items.forEach((item, index) => {
      const l = [...level, name, index];
      _.set(data, l.join('.'), null);
      if (item.content) {
        initContent(l, item.content)
      }
    });
  };
  initContent([], content);
  return data;
};

const mergeWithDefaultData = (data = {}) => {
  return _.mergeWith(defaultData(content), data, (objValue, srcValue, key, object, source, stack) => {
  });
};

const dataFromDB = {
  main: [null]
};

export const data = mergeWithDefaultData(dataFromDB);