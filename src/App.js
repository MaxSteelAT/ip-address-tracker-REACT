import './App.scss';
import image from "../src/images/pattern-bg-desktop.png";
import iconArrow from "../src/images/icon-arrow.svg"
import { useState, useEffect } from 'react'



function App() {

  return (
    <div className="App">
      <div className='header'>
        <h3 className='title'>IP Address Tracker</h3>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button class="btn btn-outline-secondary" type="button" id="button-addon2">
            <img src={iconArrow}></img>
          </button>
        </div>
        <div className="row ip-address-information">
          <div className="col-sm-12 col-md-3">
            <h4>IP ADDRESS</h4>
            <h3>192.212.174.101</h3>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>LOCATION</h4>
            <h3>Brooklyn, NY 10001</h3>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>TIMEZONE</h4>
            <h3>UTC-05:00</h3>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>ISP</h4>
            <h3>SpaceX Starlink</h3>
          </div>
        </div>
      </div>
      <div>
        <div style={{ with: '100vw', height: '400px', backgroundColor: 'blueviolet' }}></div>
      </div>
    </div>
  );
}

export default App;
