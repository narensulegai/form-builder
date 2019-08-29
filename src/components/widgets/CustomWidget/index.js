import React from 'react';
import PropTypes from 'prop-types';
import Form from "../../Form";

const content = {
  container: 'row',
  items: [
    {
      name: 'BuildingName',
      widget: 'InputBox',
      options: {label: 'Name'},
    },
    {
      name: 'BuildingName',
      widget: 'InputBox',
      options: {label: 'Name'}
    }
  ]
};

CustomWidget.propTypes = {
  onChange: PropTypes.func,
  init: PropTypes.any
};
const dataFromDB = {};

function CustomWidget(props) {
  const onChange = (d) => {
    props.onChange(d);
  };

  return (
    <Form content={content}
          init={dataFromDB}
          onChange={onChange}/>
  );
}

export default CustomWidget;