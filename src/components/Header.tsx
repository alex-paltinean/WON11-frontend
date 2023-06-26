import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FC } from "react";

export type HeaderProps = {
    countryName: string;
    selectedContinent: string;
    abracadabra: (countryName: string) => void;
    setSelectedContinent: (continent: string) => void;
}

const Header: FC<HeaderProps> = ({ countryName, selectedContinent, abracadabra, setSelectedContinent }) => {

    return <Box sx={{ display: 'flex', backgroundColor: 'antiquewhite', marginBottom: 2, alignItems: 'center', paddingTop:1 }}>
        <img src='https://fasttrackit.org/wp-content/uploads/2020/08/fasttrackit.png'></img>
        <Box sx={{ flexGrow: 1 }}></Box>
        <TextField sx={{ width: '200px', marginRight: 1 }} label='Country name' variant='outlined' value={countryName} onChange={(e) => abracadabra(e.target.value)}></TextField>
        <FormControl sx={{ width: '200px', marginRight: 2 }}>
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
    </Box>;
}

export default Header;