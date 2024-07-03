// components/Country.jsx
import Weather from './Weather';

const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages).map((lang, index) => (
        <li key={index}>{lang}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
    <Weather capital={country.capital} />
  </div>
);

export default Country;
