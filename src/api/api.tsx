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
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  async config => {
    console.log('헤더에 토큰 삽입');
    const accessToken = await AsyncStorage.getItem('accessToken'); // AsyncStorage에서 토큰 가져오기
    if (accessToken) {
      console.log(accessToken, 'accessToken');
      config.headers['Authorization'] = `Token ${accessToken}`; // 헤더에 토큰 추가
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