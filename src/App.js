import React from 'react';
import Form from './components/Form';
import {content, data} from './settings';
import './App.scss';

function App() {
  const onChange = (tree) => {
    console.log(tree);
  };
  return (
    <div className="app">
      <div className="appContainer">
        <Form content={content}
              init={data}
              onChange={onChange}/>
      </div>
    </div>
  );
}

export default App;
