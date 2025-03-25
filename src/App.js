import './App.scss';
import image from "../src/images/pattern-bg-desktop.png";
import iconArrow from "../src/images/icon-arrow.svg"


import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'

const MapUpdater = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13); // Centrar mapa
    }
  }, [lat, lng, map]);
  return null;
}

function App() {
  const [location, setLocation] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });
  const [input, setInput] = useState('')


  useEffect(() => {
    getIpInfo()
  }, []);

  console.log(position)


  const getIpInfo = () => {
    const search = input=='' ? 'www.starlink.com' : input

    const option = isIP(search) ? `&ipAddress=${search}` : `&domain=${search}`
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${option}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          throw Error("MENSAJE DE ERROR")
        }
        setLocation(data)
        console.log(data)
        setPosition({ lat: data.location.lat, lng: data.location.lng });


      })
      .catch((error) => console.error("Error obteniendo la información:", error));
  }

  const changeInput = (event) => {
    const { value } = event.target
    setInput(value)
  }

  const isIP = (string) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;
    if (ipRegex.test(string)) {
      return true
    }
    return false
  }

  const submit = (event) => {
    event.preventDefault();
    console.log("se dio enter");
  };


  return (
    <div className="App">
      <div className='header'>
        <h3 className='title'>IP Address Tracker</h3>
        <form onSubmit={submit}>
          <div class="input-group mb-3">
            <input onChange={changeInput} value={input} type="text" class="form-control" placeholder="Search for any IP address of domain" aria-label="Recipient's username" aria-describedby="button-addon2" ></input>
            <button onClick={getIpInfo} class="btn btn-outline-secondary" type="submit" id="button-addon2">
              <img src={iconArrow}></img>
            </button>
          </div>
        </form>

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
          <MapContainer className='map-template' center={[position.lat, position.lng]} zoom={16} style={{ height: '740px', width: '100%', zIndex: '1' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[position.lat, position.lng]}>
              <Popup> Estas aqui</Popup>
            </Marker>
            <MapUpdater lat={position.lat} lng={position.lng} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
