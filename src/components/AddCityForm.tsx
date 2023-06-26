import { Card, CardContent, Typography, TextField, CardActionArea, Button, Box } from "@mui/material"
import axios from "axios";
import { FC, useState } from "react";
import { Country } from "../model/Country"

export type AddCityFormProps = {
    editedCountry: Country;
    closeForm: (reload: boolean) => void;
}

const AddCityForm: FC<AddCityFormProps> = ({ editedCountry, closeForm }) => {
    const [addCityName, setAddCityName] = useState<string>('');

    const addCityToCountry = () => {
        axios.post('http://localhost:8080/countries/' + editedCountry?.id + '/cities', { name: addCityName }).then(() => {
            closeForm(true);
        });
    };

    return <Box sx={{ width: 1, justifyContent: "center", display: 'flex' }}>
        <Card sx={{ width: 0.8 }}>
            <CardContent>
                <Typography>{editedCountry?.name}</Typography>
                <TextField label='Name of city' value={addCityName} onChange={(e) => { setAddCityName(e.target.value) }}></TextField>
            </CardContent>
            <CardActionArea>
                <Button onClick={() => { addCityToCountry() }}>Save</Button>
                <Button onClick={() => { closeForm(false) }}>Cancel</Button>
            </CardActionArea>
        </Card>
    </Box>
};


export default AddCityForm;