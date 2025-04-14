import { create } from 'zustand';

type InputStore = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

const useInputStore = create<InputStore>((set) => ({
  inputValue: '',
  setInputValue: (value: string): void => set({ inputValue: value }),
}));

export { useInputStore };
