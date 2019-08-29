import React from 'react';
import PropTypes from 'prop-types';
import widgets from '../widgets';
import ContentRenderer from '../ContentRenderer'

FormGen.propTypes = {
  content: PropTypes.any
};

function withContentRenderer(formContext, content) {

  function Form(props) {
    return <FormGen formContext={formContext} content={content} {...props}/>
  }

  return content.renderer
    ? ContentRenderer[content.renderer.type](Form, formContext, content, content.renderer.type.options)
    : <Form/>;
}

function withWidgetRenderer(item, formContext) {
  const Widget = widgets[item.widget](item, formContext);

  function WidgetContainer() {
    return <div>{Widget}</div>
  }

  return <WidgetContainer/>;
}

function FormGen(props) {
  return (
    <div className={`${props.content.container} subContent`}>
      {props.content.items.map((item, j) => {
          return <div key={j}>{item.content
            ? withContentRenderer(props.formContext, item.content)
            : withWidgetRenderer(item, props.formContext)}
          </div>
        }
      )}
    </div>
  );
}

export default FormGen;