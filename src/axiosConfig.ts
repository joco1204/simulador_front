import axios from 'axios';

const baseURL = process.env.REACT_APP_URL_API;

const axiosInstance = axios.create({
    baseURL,
});

export default axiosInstance;