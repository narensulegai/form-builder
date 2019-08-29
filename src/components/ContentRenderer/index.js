import React from "react";

const extractNames = (content, names = []) => {
  console.log(content);
  content.items.forEach(i => {
    if (i.items) {
      names = [...names, ...content.items.map(e => e.name)];
    } else if (i.content) {
      names = [...names, ...extractNames(i.content)]
    }
  });
  return names;
};

export default {
  Form: function (Content, formContext, content, options = {}) {
    // console.log('back', formContext, content);

    const handleOnContinue = () => {
      console.log(formContext.getKeys());
    };
    return <div className="formBackground">
      <Content/>
      <button onClick={handleOnContinue}>Continue</button>
    </div>
  }
};