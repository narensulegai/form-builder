import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {FormContext} from "../../Form/FormContext";

Building.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
};

const getValuesFromContext = (context, data) => {
  const allKeys = context.getKeys();
  return data.map(d => {
    return {label: d.label, currValue: allKeys[d.value]}
  })
};

function Building(props) {
  const context = useContext(FormContext);
  const [values, setValues] = useState(getValuesFromContext(context, props.data));

  context.onChange(() => {
    setValues(getValuesFromContext(context, props.data));
  });

  return (
    <div className="subContent">
      <h4>{props.label}</h4>
      {values.map((d, i) => {
        return <div className="col" key={i}>
          <div>{d.label}</div>
          <i>&nbsp;&nbsp;{d.currValue}</i>
        </div>
      })}
    </div>
  );
}

export default Building;