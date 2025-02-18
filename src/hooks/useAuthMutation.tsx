import { useMutation } from '@tanstack/react-query';
import { loginUser, register, sendCode, verifyCode, resetPassword, changePassword, changeEmail, sendCodeForChangeEmail } from '../api/auth';
import useAuthStore from '../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async(data: any) => {
      console.log('Login successful:', data);
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      login({ refreshToken: data.refreshToken, accessToken: data.accessToken, user: data.user });
    },
    onError: (error: any) => {
      console.error('Login failed:', error.message);
    },
  });
};

export const useRegister = () => {

  return useMutation({
    mutationFn: register,
    onSuccess: async(data) => {
      console.log(data); 
    },
    
    onError: (error: any) => {
      console.error(error);
    },
  });
};

export const useSendCode = () => {

  return useMutation({
    mutationFn: sendCode,
    onSuccess: async(data) => {
      console.log('send successful:', data);
    },
    onError: (error: any) => {
      console.error('send failed:', error);
    },
  });
};

export const useVerifyCode = () => {

  return useMutation({
    mutationFn: verifyCode,
    onSuccess: async(data:any) => {
      console.log('send successful:', data);
    },
    onError: (error: any) => {
      console.error('send failed:', error);
    },
  });
};

export const useResetPassword = () => {
  
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: async(data: any) => {
      console.log('send successful:', data);
    },
    onError: (error: any) => {
      console.error('send failed:', error);
    },
  });
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: async(data: any) => {
      console.log('send successful:', data);
    },
    onError: (error: any) => {
      console.error('send failed:', error);
    },
  });
}

export const useChangeEmail = () => {
  return useMutation({
    mutationFn: changeEmail,
    onSuccess: async(data: any) => {
      console.log('send successful:', data);
    },
    onError: (error: any) => {
      console.error('send failed:', error);
    },
  });
}

export const useSendCodeForChangeEmail = () => {
  return useMutation({
    mutationFn: sendCodeForChangeEmail,
    onSuccess: async(data) => {
      console.log('send successful:', data);
    },
    onError: (error: any) => {
      console.error('send failed:', error);
    },
  });
}