import { api } from './api';

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

export const sendCode = async (email: string): Promise<void> => {
  const response = await api.post(`/api/auth/send-email`, { email });
  return response.data;
}

export const register = async (registerData: any): Promise<void> => {
  const response = await api.post(`/api/user`, registerData);
  return response.data;
}