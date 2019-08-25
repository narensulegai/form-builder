import React, {useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './index.scss';

const patterns = {
  nonEmpty: {regx: /.+/g, message: 'Can\'t be empty'},
  email: {regx: /.+@.+\..+/g, message: 'Invalid email'}
};

InputBox.propTypes = {
  text: PropTypes.string,
  pattern: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    null
  ]),
  onChange: PropTypes.func
};

InputBox.defaultProps = {
  text: null,
  label: null,
  pattern: 'nonEmpty'
};

function InputBox(props) {

  const [text, setText] = useState(props.text);
  const [error, setError] = useState(null);

  const validate = (text) => {
    let errMsg = null;
    if (text.match(patterns[props.pattern].regx) === null) {
      errMsg = patterns[props.pattern].message;
    }
    return errMsg;
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    const errMsg = validate(text);
    setError(errMsg);
  };

  const handleOnBlur = (e) => {
    const text = e.target.value;
    const errMsg = validate(text);
    props.onChange(errMsg === null ? text : null);
  };

  return (
    <div className="formElement">
      <div>{props.label}</div>
      <input type={'text'}
             autoComplete="no-fill"
             defaultValue={text}
             onChange={handleTextChange}
             onBlur={handleOnBlur}/>
      <div className="err">{error}</div>
    </div>
  );
}

export default InputBox;