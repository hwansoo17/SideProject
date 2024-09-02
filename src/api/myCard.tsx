import { authApi } from './api';

export interface Card {
  id: number;
  name: string;
  corporation: string;
  title: string;
  tel: string;
  email: string;
  link1: string;
  link2: string;
  link3: string;
  logoImg: string;
  bgImg: string;
  brColor: string;
  gradient: string;
  realCardImg: string;
  background: string;
}

// 카드 리스트 가져오기 함수
export const fetchMyCardList = async (): Promise<Card[]> => {
  const response = await authApi.get<Card[]>('/api/my_cards');
  console.log(response.data);
  return response.data;
};