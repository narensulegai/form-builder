import React, {useContext, useState} from "react";
import {FormContext} from "../Form/FormContext";
import _ from 'lodash';
import Form from './../../components/Form';
import Building from './../../components/widgets/Building';

export default {
  Form: function (content) {
    const context = useContext(FormContext);
    const options = content.renderer.options;

    const validate = () => {
      return !_.some(_.values(_.pick(context.getKeys(), options.validate)), (e) => e === null);
    };

    const [showSummary, setShowSummary] = useState(false);

    const handleOnContinue = () => {
      const isValid = validate();
      if (!isValid) {
        alert('Form is invalid');
      } else {
        setShowSummary(!showSummary);
      }
    };

    const onChange = (d) => {
      context.setKeys(d);
    };

    return <div className="formBackground">
      {showSummary
        ? <Building label={options.label} summary={options.summary}/>
        : <>
          <Building label={options.label} summary={options.summary}/>
          <Form content={content} init={context.getKeys()} onChange={onChange}/>
        </>
      }
      <div className="col right">
        <button onClick={handleOnContinue}>{showSummary ? 'Edit' : 'Continue'}</button>
      </div>
    </div>
  }
};