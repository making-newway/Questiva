import axios from 'axios';

const axiosHelper = axios.create({
    baseURL: "http://localhost:5000"
});

export default axiosHelper;