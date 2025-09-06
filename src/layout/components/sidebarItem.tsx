import { useNavigate } from "react-router-dom"
import { useSidebarStates } from "../../hooks/store"

interface Iprops {
    icon?: any,
    label?: any,
    link?: any,
    index?: any,
}
export default function SidebarItems({ label, icon, link, index }: Iprops) {
    const { sidebarState } = useSidebarStates()
    const { itemState, toggleItemState } = useSidebarStates()
    const { dropIndex, setDropIndex } = useSidebarStates();
    const isOpen = dropIndex === index;
    const navigate = useNavigate()
    const execute = () => {
        toggleItemState(index)
        setDropIndex(isOpen ? null : index)
        navigate(link)
    }

    return (
        <div onClick={execute} className={`flex items-center gap-2 p-1 text-gray-700 hover:text-gray-950  hover:bg-slate-200 cursor-pointer rounded-md ${itemState === index && `bg-slate-200 text-gray-950`}`}>
            <span className={`flex items-center justify-center duration-300 ${sidebarState ? `text-[.9rem]` : `text-[1.2rem] w-full`}`}>{icon}</span>
            <span className={`flex items-start w-full ${sidebarState ? `block` : `hidden`} text-nowrap font-semibold duration-300 text-[.8rem]`}>{label}</span>
        </div>
    )
}