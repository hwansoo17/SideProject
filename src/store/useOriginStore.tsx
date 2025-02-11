import {create} from 'zustand';

interface IOriginState {
    origin: string;
    setOrigin: (origin: string) => void;
}

const useOriginStore = create<IOriginState>((set: any) => ({
    origin: "",
    setOrigin: (origin: string) => set({origin}),
}));

export default useOriginStore;