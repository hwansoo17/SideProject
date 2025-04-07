import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, authApi } from "./api";

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

export interface ChangePasswordData {
  newPassword: string;
  oldPassword: string;
}

export interface ChangeEmailData {
  newEmail: string;
  otpInput: string;
}

export const loginUser = async (loginData: LoginData): Promise<void> => {
  const response = await api.post(`/api/auth/login`, loginData);
  return response.data;
};

export const kakaoLoginUser = async (accessToken: string): Promise<void> => {
  const response = await api.post(`/api/auth/kakao-login`, { accessToken });
  return response.data;
};

export const refresh = async (): Promise<void> => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  console.log(refreshToken, "refreshToken");
  const response = await api.post(`/api/auth/refresh`, { refreshToken });
  await AsyncStorage.setItem("accessToken", response.data.accessToken);
  return response.data;
};

export const sendCode = async (email: string): Promise<void> => {
  const response = await api.post(`/api/auth/send-email`, { email });
  return response.data;
};

export const register = async (registerData: RegisterData): Promise<void> => {
  const response = await api.post(`/api/user`, registerData);
  return response.data;
};

export const verifyCode = async (
  VerifyCodeData: VerifyCodeData
): Promise<void> => {
  const response = await api.post(`/api/auth/verify-code`, VerifyCodeData);
  return response.data;
};

export const resetPassword = async (
  resetPasswordData: ResetPasswordData
): Promise<void> => {
  const response = await api.post(
    `/api/auth/change-password`,
    resetPasswordData
  );
  return response.data;
};

export const changePassword = async (
  changePasswordData: ChangePasswordData
): Promise<void> => {
  const response = await authApi.post(
    `/api/auth/config/change-password`,
    changePasswordData
  );
  return response.data;
};

export const changeEmail = async (
  changeEmailData: ChangeEmailData
): Promise<void> => {
  const response = await authApi.post(
    `/api/auth/config/change-email`,
    changeEmailData
  );
  return response.data;
};

export const sendCodeForChangeEmail = async (email: string): Promise<void> => {
  const response = await authApi.post(`/api/auth/config/send-email`, { email });
  return response.data;
};
