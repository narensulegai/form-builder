import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import widgets from '../widgets';
import ContentRenderer from '../ContentRenderer'

FormGen.propTypes = {
  content: PropTypes.any
};

function withContentRenderer(content) {
  function Form(props) {
    return <FormGen content={content} {...props}/>
  }

  return content.renderer
    ? ContentRenderer[content.renderer.type](Form, content, content.renderer.options)
    : <Form/>;
}

function withWidgetRenderer(item) {
  const Widget = widgets[item.widget](item);

  function WidgetContainer() {
    return <div>{Widget}</div>
  }

  return <WidgetContainer/>;
}

function FormGen(props) {
  return (
    <div className={`${props.content.container} subContent`}>
      {props.content.items.map((item, j) => {
          return <div key={j}>{
            item.content
              ? withContentRenderer(item.content)
              : withWidgetRenderer(item)}
          </div>
        }
      )}
    </div>
  );
}

export default FormGen;