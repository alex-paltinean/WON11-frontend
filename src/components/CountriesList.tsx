import { Box, Button, Card, CardContent, Chip, Grid, List, ListItem, Typography } from "@mui/material"
import axios from "axios";
import { FC } from "react";
import { City } from "../model/City";
import { Country } from "../model/Country";

export type CountriesListProps = {
    countries: Country[];
    reloadCountries: () => void;
    editCountry: (country: Country) => void;
    addCityToCountry: (country: Country) => void;
}

const CountriesList: FC<CountriesListProps> = ({ countries, reloadCountries, editCountry, addCityToCountry }) => {

    const deleteCountry = (countryId: number) => {
        axios.delete('http://localhost:8080/countries/' + countryId).then(() => { reloadCountries() });
    }

    return <List sx={{ width: 1, overflow: 'auto', marginTop: 1, flexGrow: 1 }}>
        {countries.map((country: Country) => <ListItem sx={{ justifyContent: 'center', paddingLeft: 0, paddingRight: 0 }}>
            <Card sx={{ width: 0.8 }}>
                <CardContent>
                    <Typography variant="h6">{country.name}</Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography>Capital: {country.capital?.name}</Typography>
                            <Typography>Population: {country.population}</Typography>
                            <Typography>Area: {country.area}</Typography>
                            <Typography>Continent: {country.continent}</Typography>
                            {country.cities.map((city: City) => <Chip label={city.name}></Chip>)}
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Button variant='outlined' sx={{ margin: 1 }} onClick={() => editCountry(country)} >Edit</Button>
                            <Button variant='outlined' sx={{ margin: 1 }} onClick={() => addCityToCountry(country)}> Add city</Button>
                            <Button sx={{ color: 'red', margin: 1 }} onClick={() => deleteCountry(country.id)}>Delete</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </ListItem>)}
    </List>;
}


export default CountriesList;