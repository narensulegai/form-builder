export const defaultData = (content) => {
  let data = {};
  const initContent = (content) => {
    content.items.forEach((item) => {
      if (item.widget && item.name) {
        data[item.name] = item.isRepeatable ? [null] : item.hasOwnProperty('defaultValue') ? item.defaultValue : null;
      }
      if (item.content && !item.widget) {
        initContent(item.content)
      }
    });
  };
  initContent(content);
  return data;
};
