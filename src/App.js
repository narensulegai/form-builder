import React from 'react';
import Form from './components/Form';
import {content} from './services/settings/tenants/tenant6';
import './App.scss';

const data = window.sessionStorage.getItem('data');
// const data = null;
const dataFromDB = data === null ? {} : JSON.parse(data);

function App() {

  let data = null;

  const onChange = (t) => {
    data = t;
  };

  const handleOnSave = () => {
    console.log(data);
    if (data === null) return;
    const s = JSON.stringify(data);
    window.sessionStorage.setItem('data', s);
  };

  const handleOnClear = () => {
    window.sessionStorage.clear();
  };

  return (
    <div className="app">
      <div className="appContainer">

        <Form content={content}
              init={dataFromDB}
              onChange={onChange}/>

        <button onClick={handleOnClear}>Clear</button>
        &nbsp;&nbsp;
        <button onClick={handleOnSave}>Save</button>
      </div>
    </div>
  );
}

export default App;
