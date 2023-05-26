import axios from "axios";

const baseURL = 'http://177.139.169.54:3000';

const api = axios.create({
  baseURL,
});

export default api;