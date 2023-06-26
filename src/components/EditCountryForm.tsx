import { Card, CardContent, Typography, TextField, CardActionArea, Button, Box } from "@mui/material"
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Country } from "../model/Country"

export type EditCountryFormProps = {
    editedCountry: Country;
    closeForm: (reload: boolean) => void;
}

const EditCountryForm: FC<EditCountryFormProps> = ({ editedCountry, closeForm }) => {
    const [editCountryPopulation, setEditCountryPopulation] = useState<number>(0);
    const [editCountryArea, setEditCountryArea] = useState<number>(0);

    useEffect(() => {
        setEditCountryPopulation(editedCountry?.population || 0);
        setEditCountryArea(editedCountry?.area || 0);
    }, [editedCountry]);

    const saveCountry = () => {
        axios.put('http://localhost:8080/countries/' + editedCountry?.id, { population: editCountryPopulation, area: editCountryArea }).then(() => {
            closeForm(true);
        });
    };

    return <Box sx={{ width: 1, justifyContent: "center", display: 'flex' }}>
        <Card sx={{ width: 0.8 }}>
            <CardContent>
                <Typography>{editedCountry?.name}</Typography>
                <TextField label='Population' value={editCountryPopulation} onChange={(e) => { setEditCountryPopulation(e.target.value as any as number) }}></TextField>
                <TextField label='Area' value={editCountryArea} onChange={(e) => { setEditCountryArea(e.target.value as any as number) }}></TextField>
            </CardContent>
            <CardActionArea>
                <Button onClick={() => { saveCountry() }}>Save</Button>
                <Button onClick={() => { closeForm(false) }}>Cancel</Button>
            </CardActionArea>
        </Card>
    </Box>
};


export default EditCountryForm;