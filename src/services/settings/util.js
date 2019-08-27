export const defaultData = (content) => {
  let data = {};
  const initContent = (content) => {
    content.items.forEach((item) => {
      if (item.content) {
        initContent(item.content)
      } else {
        data[item.name] = null;
      }
    });
  };
  initContent(content);
    return data;
};