import axios from "axios";

const API_URL = ``;

const axiosConfig = axios.create({
  baseURL: `${API_URL}`,
  headers: {

    "Content-Type": "application/json",
  }
});

export default axiosConfig;
