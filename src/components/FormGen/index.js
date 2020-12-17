import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import widgets from '../widgets';
import {FormContext} from "../Form/FormContext";

function ToList(props) {
  const context = useContext(FormContext);
  const name = props.item.name;
  const [list, setList] = useState(context.getKeys()[name]);

  const handleOnAdd = () => {
    setList([...list, null]);
  };
  let callbacks = [];
  const onChange = (l => {
    context.setKey(name, l);
  });

  const listContextValue = {
    getList: () => {
      return list;
    },
    setEle: (ele, i) => {
      list[i] = ele;
      callbacks.forEach(c => c(list));
      onChange(list);
    },
    onChange: (callback) => {
      callbacks = [...callbacks, callback];
      return callbacks.length - 1;
    },
    deregister: (index) => {
      //TODO:use map instead
      callbacks[index] = () => {
      };
    }
  };
  //TODO: dont use context - replace with object
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
  return <FormGen content={content}/>;
}

function withWidgetRenderer(item) {
  const Widget = widgets[item.widget](item);
  if (item.isRepeatable) {
    return <ToList Widget={Widget} item={item}/>
  }
  return Widget;
}

// {
//   return <div key={j}>{
//     item.hasOwnProperty('content')
//       ? item.hasOwnProperty('widget') ? withWidgetRenderer(item) : withContentRenderer(item.content)
//       : withWidgetRenderer(item)}
//   </div>
// }

function FormGen(props) {
  return (
    <div className={props.content.hasOwnProperty('container') ? props.content.container : null}>
      {props.content.items.map((item, j) => {
        return <div key={j}>
          {
            item.hasOwnProperty('widget')
              ? withWidgetRenderer(item)
              : withContentRenderer(item.content)
          }
        </div>
      })}
    </div>);
}

export default FormGen;
