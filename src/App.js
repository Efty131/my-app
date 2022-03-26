import axios from "axios";
import { useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import './App.css';

function App() {
  const apiKey = "9d09e907aa6c091f62b4c7ad1f2b6387";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [imgIndex, setImgIndex] = useState(1);

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);

        setData(res.data);
      })
      .catch(() => {
        alert("No data found");
      });
  };
  const handleInputCity = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setImgIndex(Math.floor(Math.random() * 100));
    getWeatherDetails(inputCity);
  };

  let temp = (data?.main?.temp - 273.15).toFixed(0);
  let temp_min = (data?.main?.temp_min - 273.15).toFixed(2);
  let temp_max = (data?.main?.temp_max - 273.15).toFixed(2);
  // let desc = (data?.weather?.main);
  // console.log(data.weather)

  return (
    //         starts from here
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div class="card bg-dark text-center text-white border-0">
            <img
              // src="https://source.unsplash.com/600x900/?nature,water"
              src={"https://picsum.photos/200/300?random=" + imgIndex}
              class="card-img"
              alt="..."
            />
            <div class="card-img-overlay">
              <form>
                <div class="input-group mb-4 w-75 mx-auto">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="City Name"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={handleInputCity}
                  />
                  <button
                    tyep="button"
                    class="input-group-text"
                    id="basic-addon2"
                    onClick={handleSearch}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              <div className="bg-dark bg-opacity-50 py-3">
                <h2 class="card-title">{data.name}</h2>
                <p class="card-text lead">{new Date().toLocaleDateString()}</p>
                <hr />
                <i className="fas fa-cloud w-75"></i>
                <h2>{temp} &deg;C</h2>
                <p className="lead fw-bolder mb-0">cloud</p>
                <p className="lead">
                  {temp_min}&deg;C | {temp_max}&deg;C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;