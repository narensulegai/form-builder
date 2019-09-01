import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import widgets from '../widgets';
import ContentRenderer from '../ContentRenderer'
import {FormContext} from "../Form/FormContext";

function ToList(props) {
  const context = useContext(FormContext);
  const name = props.item.name;
  let contextList = context.getKeys()[name];

  const [list, setList] = useState(contextList);

  const handleOnAdd = () => {
    setList([...list, null]);
  };

  const onChange = ((d) => {
    context.setKey(name, d);
  });

  const listContextValue = {
    getList: function () {
      return contextList;
    },
    setEle: function (ele, i) {
      contextList[i] = ele;
      onChange(contextList);
    }
  };

  return <>
    {list.map((c, i) => {
      return <FormContext.Provider key={i} value={listContextValue}>
        {React.cloneElement(props.Widget, {index: i})}
      </FormContext.Provider>
    })}
    <div className="col spread">
      <button onClick={handleOnAdd}>Add</button>
    </div>
  </>
}


FormGen.propTypes = {
  content: PropTypes.any
};

function withContentRenderer(content) {
  return content.renderer
    ? ContentRenderer[content.renderer.type](content)
    : <FormGen content={content}/>;
}

function withWidgetRenderer(item) {
  const Widget = widgets[item.widget](item);
  if (item.isRepeatable) {
    return <ToList Widget={Widget} item={item}/>
  } else {
    return Widget;
  }

}

function FormGen(props) {
  return (
    <div className={`${props.content.container}`}>
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