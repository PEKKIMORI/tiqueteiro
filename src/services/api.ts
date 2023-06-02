import axios from "axios";

const baseURL = 'https://ticketeiro.vercel.app';

const api = axios.create({
  baseURL,
});

export default api;