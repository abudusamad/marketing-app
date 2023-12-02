import { create } from "zustand";

type ProModalState = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
};

export const useProModal = create<ProModalState>((set) => ({
	isOpen: true,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true }),
}));
