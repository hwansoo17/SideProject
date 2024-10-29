import {create} from 'zustand';
// import {ReactNode} from 'react';

interface IMenuItems {
  icon: string;
  title: string;
  link: string;
}

interface IBottomSheetStore {
  isOpen: boolean;
  // menuItems: ReactNode[];
  menuItems: IMenuItems[];
  openBottomSheet: (menuList: IMenuItems[]) => void;
  closeBottomSheet: () => void;
}

const useBottomSheetStore = create<IBottomSheetStore>(set => ({
  isOpen: false,
  menuItems: [],
  openBottomSheet: menuList => set({isOpen: true, menuItems: menuList}),
  closeBottomSheet: () => set({isOpen: false, menuItems: []}),
}));

export default useBottomSheetStore;
