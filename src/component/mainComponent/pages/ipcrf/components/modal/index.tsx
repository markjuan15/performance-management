import { useModalStates } from "../../../../../../hooks/store"
import Modal from "../../../../../modal/modal"

interface Iprops {
    onCancel: () => void,
    onConfirm: () => void,
}

export default function PerformanceRatingFormModal({ onCancel, onConfirm }: Iprops) {

    const { performanceRatingFormModal, togglePerformanceRatingFormModal } = useModalStates()
    return (
        <Modal state={performanceRatingFormModal} closeState={() => togglePerformanceRatingFormModal(performanceRatingFormModal)} title={"Performance Rating Form"}>
            <div className="flex flex-col items-center justify-center w-full h-full gap-5 p-4 py-[4rem] leading-none">
                <div className="flex leading-none">
                    <span className="text-[2rem] text-center font-semibold">Are you sure you want to save this form?</span>
                </div>
                <div className="flex items-center justify-center w-full gap-4">
                    <button onClick={onConfirm} className="w-[7rem] h-[3rem] rounded-md bg-blue-400 capitalize font-semibold focus:ring-2 focus:ring-blue-600 ring-offset-1 hover:bg-blue-500 text-white cursor-pointer">
                        <div className="flex items-center justify-center gap-1">
                            <span className="">Yes</span>
                        </div>
                    </button>
                    <button onClick={onCancel} className="w-[7rem] h-[3rem] rounded-md bg-red-400 capitalize font-semibold focus:ring-2 focus:ring-red-600 ring-offset-1 hover:bg-red-500 text-white cursor-pointer">
                        <div className="flex items-center justify-center gap-1">
                            <span className="">No</span>
                        </div>
                    </button>
                </div>
            </div>
        </Modal>
    )
}