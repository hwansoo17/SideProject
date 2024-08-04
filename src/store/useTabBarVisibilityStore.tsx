import {create} from 'zustand';

interface TabBarVisibilityState {
  isTabBarVisible: boolean;
  showTabBar: () => void;
  hideTabBar: () => void;
}

const useTabBarVisibilityStore = create<TabBarVisibilityState>((set) => ({
  isTabBarVisible: true, // Initial state
  showTabBar: () => set({ isTabBarVisible: true }),
  hideTabBar: () => set({ isTabBarVisible: false }),
}));

export default useTabBarVisibilityStore;
