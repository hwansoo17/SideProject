import { authApi } from './api';

interface CarouselItem {
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
export const fetchCardList = async (): Promise<CarouselItem[]> => {
  const response = await authApi.get<CarouselItem[]>('/api/cards');
  console.log(response.data);
  return response.data;
};