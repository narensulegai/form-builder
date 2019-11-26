export const defaultData = (content) => {
  let data = {};
  const initContent = (content) => {
    content.items.forEach((item) => {
      if (item.content) {
        initContent(item.content)
      } else {
        // name field is mandatory
        data[item.name] = item.isRepeatable ? [null] : null;
      }
    });
  };
  initContent(content);
  return data;
};
