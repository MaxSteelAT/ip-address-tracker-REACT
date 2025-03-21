import './App.scss';
import image from "../src/images/pattern-bg-desktop.png";
import iconArrow from "../src/images/icon-arrow.svg"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'

function App() {
  const [location, setLocation] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const position = [51.505, -0.09];

  useEffect(() => {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=8.8.8.8`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
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
            {/* Se puede validar que existan las propiedades de esta manera.
            Se pregunta si tiene la propiedad por niveles. */}
            <h3>{location && location.location && location.location.region ? location.location.region : "--"}, {location ? location.location.city : "--"}</h3>
          </div>
          <div className="col-sm-12 col-md-3">
            <h4>TIMEZONE</h4>
            {/* Se puede validar que existan las propiedades de esta manera.
            Se pregunta si existe cada propiedad */}
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
        <MapContainer className='map-template' center={position} zoom={13} style={{ height: '700px', width: '100%', zIndex:'1' }}>
      {/* Capa de tiles de OpenStreetMap */}
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Marcador en el mapa */}
      <Marker position={position}>
        {/* Popup con texto */}
        <Popup>
          A pretty CSS popup.<br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
