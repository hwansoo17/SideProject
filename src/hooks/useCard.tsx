// src/hooks/useCards.ts

import { useQuery } from '@tanstack/react-query';
import useCardStore from '../store/useCardStore';
import { fetchMyCardList, Card } from '../api/myCard';

export const useCards = () => {
  const setCards = useCardStore((state) => state.setCards);

  return useQuery<Card[], Error>(
    ['cards'], 
    fetchMyCardList, 
    {
    onSuccess: (data: Card[]) => {
      setCards(data);  // zustand 상태 업데이트
    },
    onError: (error: Error) => {
      console.error('Failed to fetch cards:', error.message);
    },
  });
};

return useQuery()