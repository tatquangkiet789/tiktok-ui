import axios from 'axios';
import { HOST } from '../constants/constants';

const axiosClient = axios.create({
    baseURL: HOST,
    timeout: 60000,
});

export default axiosClient;
