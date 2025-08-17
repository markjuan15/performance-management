import { useModalStates } from "../../../../../hooks/store";
import Modal from "../../../../modal/modal";

export default function ProfileModal() {

    const state = useModalStates((state) => state.profileModal)
    return (
        <Modal state={state} closeState={() => useModalStates.setState({ profileModal: false })} title={"Job Description"}>

        </Modal>
    )
}