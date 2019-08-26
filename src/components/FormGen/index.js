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
          const level = props.level.slice(0);
          level.push(j);
          if (item.content) {
            level.push(item.content.name);
            return <FormGen key={j}
                            formContext={props.formContext}
                            content={item.content}
                            level={level}/>
          } else {
            return widgets[item.widget](item, j, level, props.formContext)
          }
        }
      )}
    </div>
  );
}

export default FormGen;