import axios from "axios";

const baseURL = 'https://tiqueteiro-etec.shop:443';

const api = axios.create({
  baseURL,
});

export default api;