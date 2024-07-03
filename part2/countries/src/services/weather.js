import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = (capital) => {
  const request = axios.get(baseUrl, {
    params: {
      q: capital,
      appid: apiKey,
      units: 'metric'
    }
  });
  return request.then(response => response.data);
};

export default { getWeather };
