// src/store/useCardStore.ts

import { create } from 'zustand';
import { Card } from '../api/myCard';

interface CardState {
  cards: Card[] | null;
  setCards: (cards: Card[]) => void;
}

const useCardStore = create<CardState>((set) => ({
  cards: null,
  setCards: (cards) => set({ cards }),
}));

export default useCardStore;
