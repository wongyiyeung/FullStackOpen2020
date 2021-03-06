import React, { useState, useEffect } from 'react';
import axios from 'axios';

const weather_api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

const CountryElement = ({country}) => {
  const [showDetail, setShowDetail] = useState(false);

  const buttonHandler = () => {
    setShowDetail(!showDetail);
  }

  if(showDetail === false) {
    return (
      <>
        <div>
          {country.name}<button onClick={buttonHandler}>show</button>
        </div>
      </>
    );
  }
  else {
    return  (
      <>
        {country.name}<button onClick={buttonHandler}>hide</button>
        <DetailedCountryElement country={country} />
      </>
    )
  }

}

const DetailedCountryElement = ({country}) => {
  const [temperature, setTemperature] = useState(0);
  const [wind_speed, setWindspeed] = useState(0);
  const [wind_direction, setWindDirection] = useState('');

  useEffect(()=>{
    axios
      .get(`http://api.weatherstack.com/current`, 
      {
        params: {
          access_key: weather_api_key,
          query: country.name
        }
      })
      .then(response => {
        console.log(response.data);
        setTemperature(response.data.current.temperature);
        setWindspeed(response.data.current.wind_speed);
        setWindDirection(response.data.current.wind_dir);
      })
  },[country.name]);
  
  let img_alt_attr = 'Flag of ' + country.name;
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li> )}
      </ul>
      <img src={country.flag} alt={img_alt_attr}/>

      <h2>Weather in {country.name}</h2>
      <p><strong>temperature:</strong> {temperature} Celcius</p>
      <p><strong>wind:</strong> {wind_speed} mph direction {wind_direction}</p>
    </>
  );
}

const CountryList = ({countries, filter}) => {
  const foundCountries = countries.filter(country => country.name.slice(0, filter.length).localeCompare(filter, 'en', {sensitivity: 'accent'}) === 0);
  
  if(filter.length === 0){
    return (
      <></>
    );
  }
  else if(foundCountries.length === 1){
    return (
      <>
        <DetailedCountryElement country={foundCountries[0]} />
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
      {foundCountries.map(country => <CountryElement key={country.callingCodes} country={country} /> )}
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
