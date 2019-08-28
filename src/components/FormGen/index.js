import React from 'react';
import PropTypes from 'prop-types';
import widgets from '../widgets';

FormGen.propTypes = {
  content: PropTypes.any
};

function FormGen(props) {
  return (
    <div className={`${props.content.container} subContent`}>
      {props.content.items.map((item, j) => {
          if (item.content) {
            return <FormGen key={j}
                            formContext={props.formContext}
                            content={item.content}/>
          } else {
            return <div key={j}>{widgets[item.widget](item, j, props.formContext)}</div>
          }
        }
      )}
    </div>
  );
}

export default FormGen;