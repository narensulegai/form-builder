import React from 'react';
import PropTypes from 'prop-types';
import widgets from '../widgets';

FormGen.propTypes = {
  content: PropTypes.any
};

function withWidgetRenderer(item, j, formContext) {
  const Widget = widgets[item.widget](item, formContext);

  function WidgetContainer() {
    return <div key={j}>{Widget}</div>
  }

  return <WidgetContainer/>;
}

function FormGen(props) {
  return (
    <div className={`${props.content.container} subContent`}>
      {props.content.items.map((item, j) => {
          if (item.content) {
            return <FormGen key={j}
                            formContext={props.formContext}
                            content={item.content}/>
          } else {
            return <div key={j}>{withWidgetRenderer(item, j, props.formContext)}</div>
          }
        }
      )}
    </div>
  );
}

export default FormGen;