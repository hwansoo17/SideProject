import {create} from 'zustand';

interface IUpdateCardStepState {
  step: number;
  formData: ICardFormData;
  isMyCard: boolean;
  setStep: (step: number) => void;
  resetStep: () => void;
  updateFormData: (key: keyof ICardFormData, value: string | string[]) => void;
  setIsMyCard: (isMyCard: boolean) => void;
  resetFormData: () => void;
  setFormData: (data: ICardFormData) => void;
}

type IConfigTabStep = 'BG' | 'INFO' | 'CORP' | 'LOGO';

interface IConfigTabState {
  step: IConfigTabStep;
  setStep: (step: IConfigTabStep) => void;
  resetStep: () => void;
}

interface ILogoSearchState {
  search: string;
  logoImg: string;
  setSearch: (search: string) => void;
  setLogoImg: (logoImg: string) => void;
}

interface ICardFormData {
  id?: number;
  name: string;
  corporation: string;
  title: string;
  tel: string;
  email: string;
  address: string;
  links: string[];
  realCardImg: string;

  logoImg: string;
  bgImg: string;
  brColor: string;
  gradient: string;
  background: string;
}

const initialFormData: ICardFormData = {
  name: '',
  corporation: '',
  title: '',
  tel: '',
  address: '',
  email: '',
  links: [],
  realCardImg: '',
  logoImg: '',
  bgImg: '',
  brColor: '',
  gradient: '',
  background: 'COLOR',
};

const useUpdateCardStore = create<IUpdateCardStepState>((set: any) => ({
  step: 1,
  formData: initialFormData,
  isMyCard: false,
  setStep: (newStep: number) => set({step: newStep}),
  resetStep: () =>
    set({
      step: 1,
      formData: initialFormData,
      isMyCard: false,
    } as IUpdateCardStepState),
  updateFormData: (key: keyof ICardFormData, value: string | string[]) =>
    set((state: IUpdateCardStepState) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),
  setFormData: (data: ICardFormData) => set({formData: data}),
  setIsMyCard: (isMyCard: boolean) => set({isMyCard}),
  resetFormData: () => set({formData: initialFormData}),
}));

export const useConfigTabStore = create<IConfigTabState>((set: any) => ({
  step: 'BG',
  setStep: (step: IConfigTabStep) => set({step}),
  resetStep: () => set({step: 'BG'}),
}));

export const useLogoSearchStore = create<ILogoSearchState>((set: any) => ({
  search: '',
  logoImg: '',
  setSearch: (search: string) => set({search}),
  setLogoImg: (logoImg: string) => set({logoImg}),
}));

export default useUpdateCardStore;
