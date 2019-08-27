import React from 'react';
import Form from './components/Form';
import {content} from './services/settings';
import './App.scss';

const dataFromDB = {email1: 'naren@gmail.com', name1: 'Naren'};

function App() {

  let data = null;

  const onChange = (t) => {
    data = t;
  };

  const handleOnSave = () => {
    console.log(data)
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
