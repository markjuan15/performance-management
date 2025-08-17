import { useNavigate } from "react-router-dom"
import { useSidebarStates } from "../../hooks/store"

interface Iprops {
    icon?: any,
    label?: any,
    index?: any,
    link?: any,
}
export default function DropdownItems({ label, icon, index, link }: Iprops) {

    const state = useSidebarStates((state) => state.itemState)
    const navigate = useNavigate()
    const execute = () => {
        useSidebarStates.setState({ itemState: index })
        navigate(link)
    }

    return (
        <div onClick={execute} className={`flex items-center gap-2 text-[.8rem] text-gray-700 hover:text-gray-950 py-1 hover:bg-slate-200 cursor-pointer px-3 pl-10 rounded-md ${state === index && `bg-slate-200 text-gray-950`}`}>
            {icon}
            <span className="font-semibold">{label}</span>
        </div>
    )
}