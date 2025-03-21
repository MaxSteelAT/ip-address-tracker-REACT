import './App.scss';
import image from "../src/images/pattern-bg-desktop.png";
import iconArrow from "../src/images/icon-arrow.svg"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from 'react'

function App() {
  const [location, setLocation] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=8.8.8.8`)
      .then((res) => res.json())
      .then((data) => {
        if(data.code){
          throw Error("MENSAJE DE ERROR")
        }
        setLocation(data)
      })
      .catch((error) => console.error("Error obteniendo la información:", error));
  }, []);
console.log("error location", location)

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
            <h3>{location && location.ip ? location.ip : "--"}</h3>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>LOCATION</h4>
            <h3>{location && location.location && location.location.country ? location.location.country: "--"} {location ? location.location.region:"--"}</h3>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>TIMEZONE</h4>
            <h3>{location?.location?.timezone ? location.location.timezone : "--"}</h3>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>ISP</h4>
            <h3>{location ? location.isp : "--"}</h3>
          </div>
        </div>
      </div>
      <div>
        <div className='map-container'>
          {/* <LoadScript googleMapsApiKey="AIzaSyDrC01_CcLy_TUB6Yd4ncjZcpV-5sQrbZo">
            <GoogleMap mapContainerClassName='google-map-container' center={location} zoom={14}>
              <Marker position={location} />
            </GoogleMap>
          </LoadScript> */}
        </div>
      </div>
    </div>
  );
}

export default App;
