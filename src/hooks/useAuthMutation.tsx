import { useMutation } from '@tanstack/react-query';
import { loginUser, register, sendCode, verifyCode, resetPassword } from '../api/auth';
import useAuthStore from '../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async(data: any) => {
      console.log('Login successful:', data);
      await AsyncStorage.setItem('token', data.token);
      login({ token: data.token, user: data.user });
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
