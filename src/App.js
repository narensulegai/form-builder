import React from 'react';
import Form from './components/Form';
import {content, data} from './settings';
import './App.scss';

function App() {

  let tree = null;

  const onChange = (t) => {
    tree = t;
  };

  const handleOnSave = () => {
    console.log(tree)
  };

  return (
    <div className="app">
      <div className="appContainer">

        <Form content={content}
              init={data}
              onChange={onChange}/>

        <button onClick={handleOnSave}>Save</button>
      </div>
    </div>
  );
}

export default App;
