import {create} from 'zustand';
interface ToggleStore {

  selectedOption: string;

  setSelectedOption: (option: string) => void;

}

const useToggleStore = create<ToggleStore>((set) => ({
  selectedOption: '모바일', // 기본값
  setSelectedOption: (option: string) => set({ selectedOption: option }), // 상태 업데이트 함수
}));

export default useToggleStore;