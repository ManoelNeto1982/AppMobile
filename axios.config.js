import axios from 'axios';

const API_URL=``

const axiosConfig = axios.create({
  baseURL: `${API_URL}`
});

export default axiosConfig;
