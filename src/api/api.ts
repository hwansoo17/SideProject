import axios from 'axios';
import config from '../../config';

export const api = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});