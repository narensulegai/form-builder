import React from 'react';
import Form from './components/Form';
import {content} from './services/settings';
import './App.scss';

const dataFromDB = {
  "BuildingDescription": [{
    "BuildingDescription": "B1",
    "StreetAddress": "Stree1",
    "Suite": "Suite",
    "City": "Bloare",
    "State": "KA",
    "ZipCode": "56004",
    "Q1Text": null,
    "Q1": true
  }]
};

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
