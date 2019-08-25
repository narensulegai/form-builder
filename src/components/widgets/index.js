import React from 'react';
import InputBox from "./InputBox";
import PropTypes from 'prop-types';

ValueSync.propTypes = {};

function ValueSync(props) {
  return (
    <div></div>
  );
}


export default {
  EmailInputBox: (options, index, set) => {
    const onChange = (val) => {
      set(val)
    };
    return <InputBox key={index} pattern="email" label="Enter Email" onChange={onChange} {...options}/>
  },
  NonEmptyInputBox: (options, index, set) => {
    const onChange = (val) => {
      set(val)
    };
    return <InputBox key={index} pattern="nonEmpty" label="Enter" onChange={onChange} {...options}/>
  }
};
