import axios from "axios";
import { API_BASE_URL } from "./config";

const API = axios.create({ baseURL: API_BASE_URL });

export const userChats = (id) => API.get(`/chat/${id}`);
export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);
export const createChat = (data) => API.post(`/chat`, data);
