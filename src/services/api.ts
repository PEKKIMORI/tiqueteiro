import axios from "axios";

const baseURL = 'https://tickets-omega.vercel.app';

const api = axios.create({
  baseURL,
});

export default api;