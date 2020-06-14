import React, { useState, useEffect } from 'react';

import axios from 'axios';

const CountryList = ({countries, filter}) => {
  const foundCountries = countries.filter(country => country.name.slice(0, filter.length).localeCompare(filter, 'en', {sensitivity: 'accent'}) === 0);
  
  if(filter.length === 0){
    return (
      <></>
    );
  }
  else if(foundCountries.length === 1){
    const country = foundCountries[0];
    return (
      <>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <h2>languages</h2>
        <ul>
          {country.languages.map(lang => <li key={lang.name}>{lang.name}</li> )}
        </ul>
        <img src={country.flag} />
      </>
    );
  }
  else if(foundCountries.length > 10)
  {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    );
  }
  return (
    <>
      {foundCountries.map(country => <p key={country.name}>{country.name}</p> )}
    </>
  );
}

function App() {
  const [searchField, setSearchField] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  },[]);

  const searchCountries = (event) => {
    setSearchField(event.target.value);
  }

  return (
    <div>
      <form>
        <label>find countries</label>
        <input type='text' onChange={searchCountries} value={searchField}></input>
      </form>
      <ul>
        <CountryList countries={countries} filter={searchField}/>
      </ul>
    </div>
  );
}

export default App;
