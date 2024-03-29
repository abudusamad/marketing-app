import {create} from 'zustand';

type MobileSidebarState = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const useMobileSidebar = create<MobileSidebarState>((set) => ({
    isOpen: false,
    onClose: () => set({isOpen: false}),
    onOpen: () => set({isOpen: true}),
}));