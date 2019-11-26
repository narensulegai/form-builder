import React from 'react';
import Form from './components/Form';
import {content} from './services/settings/tenants/tenant3';
import './App.scss';

const dataFromDB = {};

function App() {

  let data = null;

  const onChange = (t) => {
    data = t;
  };

  const handleOnSave = () => {
    console.log('App', data)
  };

  return (
    <div className="app">
      <div className="appContainer">

        <Form content={content}
              init={dataFromDB}
              onChange={onChange}/>

        <button onClick={handleOnSave}>Save</button>
      </div>
    </div>
  );
}

export default App;
