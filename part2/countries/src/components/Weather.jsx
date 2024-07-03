// components/Weather.jsx
import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeather(capital[0]).then(data => {
      setWeather(data);
    }).catch(error => {
      console.error('Error fetching weather data:', error);
    });
  }, [capital]);

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Wind: {weather.wind.speed} m/s</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`Weather icon for ${weather.weather[0].description}`}
      />
      <p>{weather.weather[0].description}</p>
    </div>
  );
};

export default Weather;
