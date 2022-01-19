import React, { useState } from 'react';
import Form from './components/Form';
import {content as content1} from './services/settings/tenants/tenant1';
import {content as content2} from './services/settings/tenants/tenant2';
// import {content as content3} from './services/settings/tenants/tenant3';
import {content as content4} from './services/settings/tenants/tenant4';
import {content as content5} from './services/settings/tenants/tenant5';
import {content as content6} from './services/settings/tenants/tenant6';
import './App.scss';
const tenants = [content1, content2, content4, content5, content6];
const data = window.sessionStorage.getItem('data');
// const data = null;
// const dataFromDB = data === null ? {} : JSON.parse(data);

function App() {

  let data = null;

  const onChange = (t) => {
    data = t;
  };
  const [currTenant, setCurrTenant] = useState(tenants[0]);
  const handleOnSave = () => {
    alert(JSON.stringify(data, null, 2));
    if (data === null) return;
    const s = JSON.stringify(data);
    window.sessionStorage.setItem('data', s);
  };

  const handleOnClear = () => {
    window.sessionStorage.clear();
  };

  const handleTenantChange = (e) => {
    setCurrTenant(tenants[parseInt(e.target.value)])
  }

  const handleShowConfig = () => {
      alert(JSON.stringify(currTenant, null, 2))
  }

  return (
    <div className="app">
      <div className="appContainer">
        <h1 className="center">JSON Form builder</h1>
        <h4>
            The forms below are auto-generated using a json configuration file. Select a sample config file
            &nbsp;<select onChange={handleTenantChange}>
                {tenants.map((t,i)=>{
                    return <option key={i} value={i}>Sample form {i+1}</option>
                })}
            </select>&nbsp;
            <a href="javascript:void(0)" onClick={handleShowConfig}>Show config</a>
        </h4>
        <div className="mediumMarginBottom">Enter some data in the form below and click <b>Test Exported From Form</b> to see the JSON data</div>
        <Form content={currTenant}
              init={{}}
              onChange={onChange}/>

        {/*<button onClick={handleOnClear}>Clear</button>*/}
        <button onClick={handleOnSave}>Test Exported From Form</button>
      </div>
    </div>
  );
}

export default App;
