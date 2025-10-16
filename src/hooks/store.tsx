import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ModalState {
    profileModal: boolean,
    performanceRatingFormModal: boolean,
    performanceRatingModal: boolean,
    toggleEventModal: () => void,
    togglePerformanceRatingFormModal: (index: boolean) => void,
    togglePerformanceRatingModal: (index: boolean) => void,
}

interface SidebarState {
    itemState: any,
    dropIndex: number | null
    sidebarState: boolean,
    toggleItemState: (index: number | null) => void,
    setDropIndex: (index: number | null) => void,
    toggleSidebarState: (index: boolean) => void,
}

export const useModalStates = create<ModalState>()(
    devtools(
        (set) => ({
            profileModal: false,
            performanceRatingFormModal: false,
            performanceRatingModal: false,
            toggleEventModal: () => set((state: { profileModal: any }) => ({ profileModal: !state.profileModal, })),
            togglePerformanceRatingFormModal: (index) => set({ performanceRatingFormModal: !index }),
            togglePerformanceRatingModal: (index) => set({ performanceRatingModal: !index }),
        }),
        { name: 'modalStates' },
    ),
)

export const useSidebarStates = create<SidebarState>()(
    devtools(
        persist(
            (set) => ({
                itemState: 0,
                dropIndex: null,
                sidebarState: true,
                toggleItemState: (index) => set({ itemState: index }),
                setDropIndex: (index) => set({ dropIndex: index }),
                toggleSidebarState: (index) => set({ sidebarState: !index }),
            }),
            { name: 'sidebarStates' }
        )
    ),
)