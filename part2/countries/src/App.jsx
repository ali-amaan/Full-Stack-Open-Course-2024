// App.jsx
import { useState, useEffect } from 'react';
import countriesService from './services/countries';
import Country from './components/Country';
import CountryList from './components/CountryList';
import Filter from './components/Filter';
import './index.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then(initialCountries => {
      setCountries(initialCountries);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null); // Reset selected country when filter changes
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <p>find countries</p>
      <Filter value={filter} onChange={handleFilterChange} />
      {selectedCountry ? (
        <Country country={selectedCountry} />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        <CountryList countries={filteredCountries} onShowCountry={handleShowCountry} />
      ) : filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <p>No matches found</p>
      )}
    </div>
  );
};

export default App;
