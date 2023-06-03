import axios from "axios";

const baseURL = 'https://ticketeiro-omega.vercel.app';

const api = axios.create({
  baseURL,
});

export default api;