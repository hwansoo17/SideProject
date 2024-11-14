import {create} from 'zustand';


interface IBottomSheetStore {
  isOpen: boolean;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}

interface ILinkBottomSheetStore extends IBottomSheetStore {
  links: {url: string; type: string}[];
  selectedUrl: string;
  setLinks: (url: string) => void;
  setSelectedUrl: (url: string) => void;
  deleteLink: () => void;
  editLink: (newUrl: string) => void;
  detectLinkType: (url: string) => string;
}

interface ICardSubmitBottomSheetStore extends IBottomSheetStore {
  onSubmit: () => void;
  onCreateMobileCard: () => void;
  setOnSubmit: (fn: () => void) => void;
  setOnCreateMobileCard: (fn: () => void) => void;
}

export const useCreatedCardBottomSheetStore = create<IBottomSheetStore>(
  set => ({
    isOpen: false,
    openBottomSheet: () => set({isOpen: true}),
    closeBottomSheet: () => set({isOpen: false}),
  }),
);
export const useLinkBottomSheetStore = create<ILinkBottomSheetStore>(set => ({
  isOpen: false,
  links: [],
  selectedUrl: '',
  deleteLink: () => {
    set(state => ({
      links: state.links.filter(link => link.url !== state.selectedUrl),
    }));
  },
  editLink: (newUrl: string) => {
    set(state => ({
      links: state.links.map(link =>
        link.url === state.selectedUrl
          ? {url: newUrl, type: state.detectLinkType(newUrl)}
          : link,
      ),
    }));
  },
  setLinks: (url: string) => {
    set(state => ({
      links: [...state.links, {url, type: state.detectLinkType(url)}],
    }));
  },
  setSelectedUrl: (url: string) => set({selectedUrl: url}),
  openBottomSheet: () => set({isOpen: true}),
  closeBottomSheet: () => set({isOpen: false}),
  detectLinkType: (url: string) => {
    if (url.includes('twitter.com') || url.includes('x.com')) return 'x';
    if (url.includes('kakao.com')) return 'kakao';
    if (url.includes('facebook.com')) return 'facebook';
    if (url.includes('instagram.com')) return 'instagram';
    return 'link';
  },
}));

export const useCardSubmitBottomSheetStore = create<ICardSubmitBottomSheetStore>(
  set => ({
    isOpen: false,
    openBottomSheet: () => set({isOpen: true}),
    closeBottomSheet: () => set({isOpen: false}),
    onSubmit: () => {},
    onCreateMobileCard: () => {},
    setOnSubmit: fn => set({onSubmit: fn}),
    setOnCreateMobileCard: fn => set({onCreateMobileCard: fn}),
  }),
);
