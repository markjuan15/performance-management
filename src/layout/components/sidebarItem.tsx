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
        <div onClick={execute} className={`flex items-center gap-2 text-[.8rem] text-gray-700 hover:text-gray-950 py-1 hover:bg-slate-200 cursor-pointer px-3 rounded-md ${itemState === index && `bg-slate-200 text-gray-950`}`}>
            <span className={`flex items-center justify-center duration-200 ${sidebarState ? `text-[.9rem]` : `text-[1rem] w-full`}`}>{icon}</span>
            <span className={`${sidebarState ? `block` : `hidden`} font-semibold duration-200`}>{label}</span>
        </div>
    )
}