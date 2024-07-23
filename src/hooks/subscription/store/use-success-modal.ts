import { create } from "zustand";

interface SuccessModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSuccessModal = create<SuccessModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
