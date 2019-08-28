import React, {useState} from 'react';
import PropTypes from 'prop-types';

Building.propTypes = {};

const getValuesFromContext = (context, data) => {
  const allKeys = context.getKeys();
  return data.map(d => {
    return {label: d.label, currValue: allKeys[d.value]}
  })
};

function Building(props) {

  const [values, setValues] = useState(getValuesFromContext(props.context, props.data));

  props.context.onChange(() => {
    setValues(getValuesFromContext(props.context, props.data));
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