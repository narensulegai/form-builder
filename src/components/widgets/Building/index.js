import React from 'react';
import PropTypes from 'prop-types';
import Form from "../../Form";

const content = {
  name: 'main',
  container: 'row',
  items: [
    {
      widget: 'EmailInputBox',
      options: {label: 'Email'},
    },
    {
      widget: 'NonEmptyInputBox',
      options: {label: 'Name'},
      hideIf: (data) => {
        return data.main[0] === null;
      }
    }
  ]
};

Building.propTypes = {
  onChange: PropTypes.func,
  init: PropTypes.any
};

function Building(props) {
  const data = props.init === null ? {main: [null, null]} : props.init;
  return (
    <Form content={content} init={data} onChange={props.onChange}/>
  );
}

export default Building;