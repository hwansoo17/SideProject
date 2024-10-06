import { useMutation } from '@tanstack/react-query';
import { register } from '../api/auth';
import useAuthStore from '../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useRegister = () => {

  return useMutation({
    mutationFn: register,
    onSuccess: async(data) => {
      console.log('Login successful:', data);
    },
    
    onError: (error) => {
      console.error('Login failed:', error.response.data.message);
    },
  });
};
