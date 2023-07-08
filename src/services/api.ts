import axios from "axios";

const baseURL = 'https://localhost:3000';

const api = axios.create({
  baseURL,
});

export default api;