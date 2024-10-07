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

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface VerifyCodeData {
  email: string;
  otpInput: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
  otp: string;
}

export const loginUser = async (loginData: LoginData): Promise<void> => {
  const response = await api.post(`/api/auth/login`, loginData);
  return response.data;
};

export const sendCode = async (email: string): Promise<void> => {
  const response = await api.post(`/api/auth/send-email`, { email });
  return response.data;
}

export const register = async (registerData: RegisterData): Promise<void> => {
  const response = await api.post(`/api/user`, registerData);
  return response.data;
}

export const verifyCode = async (VerifyCodeData: VerifyCodeData): Promise<void> => {
  const response = await api.post(`/api/auth/verify-code`, VerifyCodeData);
  return response.data;
}

export const resetPassword = async (resetPasswordData: ResetPasswordData): Promise<void> => {
  const response = await api.post(`/api/auth/change-password`, resetPasswordData);
  return response.data;
}