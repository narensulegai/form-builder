import React from 'react';
import PropTypes from 'prop-types';
import Form from "../../Form";

CustomWidget.propTypes = {
  onChange: PropTypes.func,
  init: PropTypes.any,
  content: PropTypes.any
};

function CustomWidget(props) {
  return (
    <Form content={props.content}
          init={props.init}
          onChange={props.onChange}/>
  );
}

export default CustomWidget;