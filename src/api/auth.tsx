import axios from 'axios';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('https://api.example.com/login', loginData);
  return response.data;
};