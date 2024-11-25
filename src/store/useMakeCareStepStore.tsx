import {create} from 'zustand';

interface IMakeCardStepState {
  step: number;
  formData: ICardFormData;
  isMyCard: boolean;
  setStep: (step: number) => void;
  resetStep: () => void;
  updateFormData: (key: keyof ICardFormData, value: string | string[]) => void;
  setIsMyCard: (isMyCard: boolean) => void;
  resetFormData: () => void;
}

interface ICardFormData {
  name: string;
  corporation: string;
  title: string;
  tel: string;
  email: string;
  address: string;
  links: string[];
  realCardImg: string;
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
};

const useMakeCardStore = create<IMakeCardStepState>((set: any) => ({
  step: 1,
  formData: initialFormData,
  isMyCard: false,
  setStep: (newStep: number) => set({step: newStep}),
  resetStep: () =>
    set({
      step: 1,
      formData: initialFormData,
      isMyCard: false,
    } as IMakeCardStepState),
  updateFormData: (key: keyof ICardFormData, value: string | string[]) =>
    set((state: IMakeCardStepState) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),
  setIsMyCard: (isMyCard: boolean) => set({isMyCard}),
  resetFormData: () => set({formData: initialFormData}),
}));

export default useMakeCardStore;
