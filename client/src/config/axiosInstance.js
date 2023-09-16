import axios from 'axios';

const API = axios.create();
API.defaults.baseURL = import.meta.VITE_BACKEND_URI;
API.defaults.timeout = 2500;

export default API;
