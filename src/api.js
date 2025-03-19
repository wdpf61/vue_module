import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/Laravel/project/public/api/', // Change to your API endpoint
});

export default api;