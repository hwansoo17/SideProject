import {create} from 'zustand';

interface IMakeCardStepState {
  step: number;
  formData: ICardFormData;
  setStep: (step: number) => void;
  resetStep: () => void;
  updateFormData: (key: keyof ICardFormData, value: string | string[]) => void;
  resetFormData: () => void;
}

interface ICardFormData {
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  links: string[];
}

const initialFormData: ICardFormData = {
  name: '',
  company: '',
  position: '',
  address: '',
  phone: '',
  email: '',
  links: [],
};

const useMakeCardStore = create<IMakeCardStepState>(set => ({
  step: 1,
  formData: initialFormData,
  setStep: newStep => set({step: newStep}),
  resetStep: () => set({step: 1}),
  updateFormData: (key, value) =>
    set(state => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),
  resetFormData: () => set({formData: initialFormData}),
}));

export default useMakeCardStore;
