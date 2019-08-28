import React from 'react';
import PropTypes from 'prop-types';
import Form from "../../Form";

const content = {
  container: 'row',
  items: [
    {
      name: 'BuildingEmail',
      widget: 'EmailInputBox',
      options: {label: 'Email'},
    },
    {
      name: 'BuildingName',
      widget: 'NonEmptyInputBox',
      options: {label: 'Name'},
      showOn: ({BuildingEmail}) => {
        return BuildingEmail !== null;
      }
    }
  ]
};

Building.propTypes = {
  onChange: PropTypes.func,
  init: PropTypes.any
};

function Building(props) {
  return (
    <Form content={content} init={props.init} onChange={props.onChange}/>
  );
}

export default Building;