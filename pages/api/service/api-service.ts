import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://soleauthenticity.azurewebsites.net/api',
    headers: {
      'Content-Type': 'application/json',
    },
});
