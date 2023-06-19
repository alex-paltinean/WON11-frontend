import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button, Card, CardContent, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

function App() {

  const [countries, setCountries] = useState<any>([]);
  const [countryName, setCountryName] = useState<string>('');
  const [selectedContinent, setSelectedContinent] = useState<string>('');

  useEffect(() => { axios.get('http://localhost:8080/countries').then((response) => setCountries(response.data)) }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/countries?' + (!!countryName ? 'name=' + countryName : '') + (!!selectedContinent ? '&continent=' + selectedContinent : '')).then((response) => setCountries(response.data));
  }, [countryName, selectedContinent]);


  return (
    <Box className="App" sx={{ height: 1 }}>
      <Box sx={{ display: 'flex', backgroundColor: 'antiquewhite' }}>
        <img src='https://fasttrackit.org/wp-content/uploads/2020/08/fasttrackit.png'></img>
        <Box sx={{ flexGrow: 1 }}></Box>
        <TextField sx={{ width: '200px' }} label='Country name' variant='outlined' value={countryName} onChange={(e) => setCountryName(e.target.value)}></TextField>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id="demo-simple-select-label">Continent</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedContinent}
            label="Continent"
            onChange={(e) => setSelectedContinent(e.target.value)}
          >
            <MenuItem value={'Europe'}>Europe</MenuItem>
            <MenuItem value={'Oceania'}>Oceania</MenuItem>
            <MenuItem value={'Asia'}>Asia</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <List sx={{ width: 1, overflow: 'auto' }}>
        {countries.map((country: any) => <ListItem sx={{ justifyContent: 'center' }}>
          <Card sx={{ width: 0.8 }}>
            <CardContent>
              <Typography variant="h6">{country.name}</Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Capital: {country.capital.name}</Typography>
                  <Typography>Population: {country.population}</Typography>
                  <Typography>Area: {country.area}</Typography>
                  <Typography>Continent: {country.continent}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Button variant='outlined' sx={{ margin: 1 }}>Edit</Button>
                  <Button variant='outlined' sx={{ margin: 1 }} > Add city</Button>
                  <Button sx={{ color: 'red', margin: 1 }}>Delete</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </ListItem>)}
      </List>
    </Box >
  );
}

export default App;
