import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ModalState {
    profileModal: boolean,
    toggleEventModal: () => void,
}

interface SidebarState {
    itemState: any,
    dropState: boolean
    toggleItemState: () => void,
    toggleDropState: () => void,
}

export const useModalStates = create<ModalState>()(
    devtools(
        (set) => ({
            profileModal: false,
            toggleEventModal: () => set((state: { profileModal: any }) => ({ profileModal: !state.profileModal, })),
        }),
        { name: 'modalStates' },
    ),
)

export const useSidebarStates = create<SidebarState>()(
    devtools(
        persist(
            (set) => ({
                itemState: 0,
                dropState: false,
                toggleItemState: () => set((state: { itemState: any }) => ({ itemState: state.itemState, })),
                toggleDropState: () => set((state: { itemState: any }) => ({ itemState: !state.itemState, })),
            }),
            { name: 'modalStates' }
        )
    ),
)