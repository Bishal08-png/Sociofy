import axios from 'axios';
import { API_BASE_URL } from './config';

const API = axios.create({ baseURL: API_BASE_URL });

export const getMessages = (id) => API.get(`/message/${id}`);
export const addMessage = (data) => API.post('/message/', data);
