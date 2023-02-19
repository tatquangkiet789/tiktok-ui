import axios from 'axios';
import { BASE_URL } from 'constants/constants';
import ENDPOINTS from 'constants/endpoints';

const test = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    withCredentials: true,
});

export const refreshTokenService = async () => {
    const response = await test.post(ENDPOINTS.refreshToken);
    return response.data;
};
