import { useState } from "react";

const Weather = () => {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=67b7d09fb956fa44e7578aca6470af16&units=metric`;

    try {
      const res = await fetch(api);
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found");
      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="container text-center mt-5">

      <div className="card p-3 mx-auto" style={{ width: "300px" }}>

        <h4>Weather App</h4>

        <input
          className="form-control my-2"
          placeholder="Search city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="btn btn-primary" onClick={fetchWeather}>
          Search
        </button>

        
        {loading && (
          <div className="mt-3">
            <div className="spinner-border"></div>
          </div>
        )}

      
        {!loading && weather && (
          <div className="mt-3">
            <h5>{weather.name}</h5>
            <h3>{weather.main.temp}°C</h3>
            <p>{weather.weather[0].description}</p>
          </div>
        )}

      </div>

    </div>
  );
};

export default Weather;