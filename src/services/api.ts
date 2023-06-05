import axios from "axios";

const baseURL = 'http://http://31.220.31.254:3000';

const api = axios.create({
  baseURL,
});

export default api;