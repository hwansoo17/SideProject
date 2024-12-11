import axios from 'axios';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = axios.create({
  // baseURL: config.SERVER_URL,
  baseURL: 'https://e9d8-221-148-3-100.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  async config => {
    console.log('헤더에 토큰 삽입');
    const token = await AsyncStorage.getItem('token'); // AsyncStorage에서 토큰 가져오기
    if (token) {
      console.log(token, 'token');
      config.headers['Authorization'] = `Token ${token}`; // 헤더에 토큰 추가
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  response => {
    console.log('authApi응답');
    return response;
  }
);