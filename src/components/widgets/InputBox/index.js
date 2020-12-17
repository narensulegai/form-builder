import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

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
  const [value, setValue] = useState(props.text);

  const handleTextChange = (e) => {
    const text = e.target.value;
    const errMsg = validate(text, props.pattern);
    props.onChange(errMsg === null ? text : null);
    setError(errMsg);
  };

  useEffect(() => {
    setValue(props.text);
  }, [props.text]);

  return (<div className="formElement">
    {/*{props.label && <div>{props.label}</div>}*/}
    {/*<input type={'text'}*/}
    {/*       autoComplete="no-fill"*/}
    {/*       value={value || ''}*/}
    {/*       onChange={handleTextChange}/>*/}
    <TextField
      error={error !== null}
      label={props.label ? props.label : ''}
      value={value === null ? '' : value}
      onChange={handleTextChange}
      variant="outlined"
      helperText={error}
    />
  </div>);
}

export default InputBox;
