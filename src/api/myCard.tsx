import { authApi } from './api';
import {ICreateCardInput, ICreateCardOutput} from './card';

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
export const fetchMyCardList = async (): Promise<CarouselItem[]> => {
  const response = await authApi.get<CarouselItem[]>('/api/my_cards');
  console.log(response.data);
  return response.data;
};

export const CreateMyCardAPI = async (
  data: ICreateCardInput,
): Promise<ICreateCardOutput> => {
  console.log({data});
  const response = await authApi.post('/api/my_cards', data);
  return response.data;
};