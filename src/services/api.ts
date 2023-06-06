import axios from "axios";

const baseURL = 'https://tiqueteiro-etec.shop:3000';

const api = axios.create({
  baseURL,
});

export default api;