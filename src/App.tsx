import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button, Card, CardActionArea, CardContent, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Header from './components/Header';
import CountriesList from './components/CountriesList';
import { Country } from './model/Country';
import EditCountryForm from './components/EditCountryForm';
import AddCityForm from './components/AddCityForm';

function App() {

  const [countries, setCountries] = useState<Country[]>([]);
  const [countryName, setCountryName] = useState<string>('');
  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [editedCountry, setEditedCountry] = useState<Country | null>(null);
  const [addCityToCountry, setAddCityToCountry] = useState<Country | null>(null);

  const getFilteredCountries = () => {
    axios.get('http://localhost:8080/countries?' + (!!countryName ? 'name=' + countryName : '') + (!!selectedContinent ? '&continent=' + selectedContinent : '')).then((response) => setCountries(response.data));
  }

  useEffect(() => { axios.get('http://localhost:8080/countries').then((response) => setCountries(response.data)) }, []);

  useEffect(() => {
    getFilteredCountries();
  }, [countryName, selectedContinent]);

  const closeEditCountryForm = (reload: boolean) => {
    if (reload) {
      getFilteredCountries();
    }
    setEditedCountry(null);
    setAddCityToCountry(null);
  }

  return (
    <Box className="App" sx={{ height: 1, justifyContent: 'center', width: 1, backgroundColor:'lightgray', display: 'flex', flexDirection:'column' }}>
      <Header countryName={countryName} selectedContinent={selectedContinent} abracadabra={setCountryName} setSelectedContinent={setSelectedContinent}></Header>
      {editedCountry && <EditCountryForm editedCountry={editedCountry} closeForm={closeEditCountryForm}></EditCountryForm>}
      {addCityToCountry && <AddCityForm editedCountry={addCityToCountry} closeForm={closeEditCountryForm}></AddCityForm>}
      <CountriesList countries={countries} reloadCountries={getFilteredCountries} editCountry={setEditedCountry} addCityToCountry={setAddCityToCountry}></CountriesList>
    </Box >
  );
}

export default App;
