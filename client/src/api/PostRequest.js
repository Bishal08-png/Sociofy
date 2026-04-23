import axios from 'axios';
import { API_BASE_URL } from './config';

const API = axios.create({ baseURL: API_BASE_URL });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => API.put(`/post/${id}/like_dislike`, { userId: userId });
export const addComment = (id, data) => API.put(`/post/${id}/comment`, data);
export const deletePost = (id, userId) => API.delete(`/post/${id}`, { data: { userId } });
