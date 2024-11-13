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

// 카드 리스트 가져오기 함수
export const fetchCardList = async (): Promise<Card[]> => {
  const response = await authApi.get<Card[]>('/api/cards');
  console.log(response.data);
  return response.data;
};