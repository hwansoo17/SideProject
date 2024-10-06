import { useMutation } from '@tanstack/react-query';
import { loginUser, LoginData, LoginResponse, sendCode } from '../api/auth';
import useAuthStore from '../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSendCode = () => {

  return useMutation({
    mutationFn: sendCode,
    onSuccess: async(data) => {
      console.log('send successful:', data);
    },
    onError: (error) => {
      console.error('send failed:', error.response.data.message);
    },
  });
};