import { api } from './api';
import config from '../../config';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(`/api/auth/login`, loginData);
  return response.data;
};