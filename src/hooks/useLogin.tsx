import { useMutation } from '@tanstack/react-query';
import { loginUser, LoginData, LoginResponse } from '../api/auth';
import useAuthStore from '../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginUser,
    onSuccess: async(data) => {
      console.log('Login successful:', data);
      await AsyncStorage.setItem('token', data.token);
      login({ token: data.token, user: data.user });
    },
    
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });
};
