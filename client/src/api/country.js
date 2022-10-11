import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getCountry = (id) => client.get(`/country/${id}`);

export const getCountries = () => client.get('/country');
