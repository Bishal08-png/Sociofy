import axios from 'axios';
import { API_BASE_URL } from './config';

const API = axios.create({ baseURL: API_BASE_URL });

export const logIn = (formData) => API.post('/auth/login', formData); 

export const signUp = (formData) => API.post('/auth/register', formData);
