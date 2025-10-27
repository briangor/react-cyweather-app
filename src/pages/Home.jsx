import { useState } from "react";
import axios from "axios";
import Chart from "../components/Chart";
import Swal from 'sweetalert2'

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [status, setStatus] = useState("");

  const main = true;
  const temp = true;
  const humidity = true;
  const cloud = true;
  const wind = true;

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      return; // Early return if geolocation is not supported
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(      
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setStatus("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setStatus("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setStatus("The request to get your location timed out.");
              break;
            case error.UNKNOWN_ERROR:
            default:
              setStatus("An unknown error occurred.");
              break;
          }
          // Default to empty in case of error
          setLat(""); 
          setLong("");
        }
      );
    }
  };

  const getForecast = () => {
    if ((lat === "") & (long === "")) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'warning',
        text: 'Coordinates empty! Please provide the location coordinates'
      })

    } else if (lat !== "") {
      axios
        .get(
          "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
            lat +
            "&longitude=" +
            long +
            "&localityLanguage=en"
        )
        .then((res) => {
          setLocationData(res);
        });

      axios
        .get(
          "https://api.open-meteo.com/v1/forecast?latitude=" +
            lat +
            "&longitude=" +
            long +
            "&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m"
        )
        .then((res) => {
          setWeatherData(res);
        });
    }
  };
  
  return (
    <>
      <div className="row">
        <div className="col-md-5 col-sm-12 col-xs-12 inputs">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Latitude
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Latitude"
              aria-describedby="basic-addon1"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Longitude
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Longitude"
              aria-describedby="basic-addon1"
              value={long}
              onChange={(e) => setLong(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary me-3 mb-3"
            onClick={getForecast}
          >
            Get Forecast
          </button>
          <button
            type="button"
            className="btn btn-primary mb-3"
            onClick={getCurrentLocation}
          >
            Get Current Location
          </button>
          <p>{status}</p>
        </div>
        { weatherData && 
          <div className="col-md-7 col-sm-12 col-xs-12 main-chart">
          {weatherData && (
            <Chart weatherData={weatherData} locationData={locationData} main={main}/>
          )}
        </div>
        }
      </div>
      <div className="row mb-3 mt-3">
        <div className="col-md-6 mb-3 unit-chart">
            { weatherData && <Chart weatherData={weatherData} locationData={locationData} temp={temp}/>}
        </div>
        <div className="col-md-6 unit-chart">
         { weatherData && <Chart weatherData={weatherData} locationData={locationData} humidity={humidity}/>}
        </div>
      </div>
      <div className="row mb-3 mt-3">
        <div className="col-md-6 mb-3 unit-chart">
        { weatherData && <Chart weatherData={weatherData} locationData={locationData} wind={wind}/>}
        </div>
        <div className="col-md-6 mb-3 unit-chart">
        { weatherData && <Chart weatherData={weatherData} locationData={locationData} cloud={cloud}/>}
        </div>
      </div>
    </>
  );
};

export default Home;
