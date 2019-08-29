import React, {useContext} from "react";
import {FormContext} from "../Form/FormContext";
import _ from 'lodash';

const extractNames = (content, names = []) => {
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
  Form: function (Content, content, options = {}) {
    // console.log('back', formContext, content);
    const context = useContext(FormContext);

    const handleOnContinue = () => {
      //TODO: check for keys in the form only
      const isInValid = _.some(_.values(context.getKeys()), (e) => e === null);
      console.log(context.getKeys());
      if (isInValid) {
        alert('Form is invalid');
      }
    };
    return <div className="formBackground">
      <Content/>
      <button onClick={handleOnContinue}>Continue</button>
    </div>
  }
};