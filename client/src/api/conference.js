import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getConference = (id) => client.get(`/conference/${id}`);

export const getConferences = () => client.get('/conference');

export const createConference = (conference) => client.post('/conference', conference);

export const updateConference = (id, conference) => client.put(`/conference/${id}`, conference);

export const deleteConference = (id) => client.delete(`/conference/${id}`);
