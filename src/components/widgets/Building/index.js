import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {FormContext} from "../../Form/FormContext";

Building.propTypes = {
  label: PropTypes.string,
  summary: PropTypes.any
};

const getValuesFromContext = (context, data) => {
  const allKeys = context.getKeys();
  return data.map(d => {
    return {label: d.label, currValue: allKeys[d.value]}
  })
};

function Building(props) {
  const context = useContext(FormContext);
  const [values, setValues] = useState(getValuesFromContext(context, props.summary));
  const callbackIndex = context.onChange(() => {
    setValues(getValuesFromContext(context, props.summary));
  });

  useEffect(() => {
    return () => {
      context.deregister(callbackIndex);
    }
  });
  return (
    <div className="summary">
      <span className="heading">{props.label}</span>
      <div className="col">
        {values.map((d, i) => {
          return <div key={i}>
            <span>{d.label}</span>
            <i>&nbsp;&nbsp;{d.currValue}&nbsp;&nbsp;</i>
          </div>
        })}
      </div>
    </div>
  );
}

export default Building;
