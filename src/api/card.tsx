import { authApi } from './api';

interface Card {
  id: number;
  name: string;
  corporation: string;
  title: string;
  tel: string;
  email: string;
  links: string[];
  logoImg: string;
  bgImg: string;
  brColor: string;
  gradient: string;
  realCardImg: string;
  background: string;
}

export interface ICreateCardInput {
  name?: string;
  corporation?: string;
  title?: string;
  tel?: string;
  email?: string;
  address?: string;
  links?: string[];
  logoImg?: string;
  bgImg?: string;
  brColor?: string;
  gradient?: string;
  realCardImg?: string;
  background?: string;
}

export interface ICreateCardOutput extends ICreateCardInput {
  id: number;
}

// 카드 리스트 가져오기 함수
export const fetchCardList = async (): Promise<Card[]> => {
  const response = await authApi.get<{ results: Card[] }>('/api/cards');
  console.log(response.data);
  return response.data.results; // `results` 배열만 반환
};

export const deleteCard = async (id: number): Promise<void> => {
  await authApi.delete(`/api/cards/${id}`);
};

export const CreateCardAPI = async (
  data: ICreateCardInput,
): Promise<ICreateCardOutput> => {
  const response = await authApi.post('/api/cards', data);
  return response.data;
};

export const CreateCardTempAPI = async (
  data: ICreateCardInput,
): Promise<ICreateCardOutput> => {
  const response = await authApi.post('/api/temp/card', data);
  return response.data;
};

export const GetCardTempAPI = async (): Promise<ICreateCardOutput> => {
  const response = await authApi.get('/api/temp/card');
  return response.data;
};