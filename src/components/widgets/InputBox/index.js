import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const patterns = {
  nonEmpty: {regx: /.+/g, message: 'Can\'t be empty'},
  email: {regx: /.+@.+\..+/g, message: 'Invalid email'}
};

const validate = (text, pattern) => {
  let errMsg = null;
  if (text.match(patterns[pattern].regx) === null) {
    errMsg = patterns[pattern].message;
  }
  return errMsg;
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

  const [error, setError] = useState(props.text === null ? null : validate(props.text, props.pattern));

  const handleTextChange = (e) => {
    const text = e.target.value;
    const errMsg = validate(text, props.pattern);
    props.onChange(errMsg === null ? text : null);
    setError(errMsg);
  };

  return (
    <div className="formElement">
      <div>{props.label}</div>
      <input type={'text'}
             autoComplete="no-fill"
             defaultValue={props.text}
             onChange={handleTextChange}/>
      <div className="err">{error}</div>
    </div>
  );
}

export default InputBox;