import { authApi } from "./api";


export const GetRandomImageAPI = async (): Promise<{id: number; description: string; imageUrl: string;}> => {
  const response = await authApi.get('/api/random-card-image');
  return response.data;
};
