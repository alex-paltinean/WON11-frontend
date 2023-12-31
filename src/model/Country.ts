import { City } from "./City";


export type Country = {
    id: number;
    name: string;
    population: number;
    area: number;
    continent: string;
    capital: City;
    cities: City[];
}