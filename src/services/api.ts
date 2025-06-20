import axios from "axios";

const baseURL = 'https://9935-177-139-169-54.ngrok-free.app';

const api = axios.create({
  baseURL,
});

export default api;