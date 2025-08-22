import { IoIosArrowDown } from "react-icons/io";
import { useSidebarStates } from "../../hooks/store";

interface Iprops {
    icon?: any,
    label?: any,
    children?: any,
    index?: any,
}

export default function DropItem({ label, icon, children, index }: Iprops) {
    const sidebarState = useSidebarStates((state) => state.sidebarState)
    const { dropIndex, setDropIndex } = useSidebarStates();
    const isOpen = dropIndex === index;

    const setStates = () => {
        useSidebarStates.setState({ sidebarState: true })
        setDropIndex(isOpen ? null : index)
    }

    return (
        <div className="flex flex-col gap-2 relative">
            <div onClick={setStates} className={`flex items-center justify-between gap-2 text-gray-700 hover:text-gray-950 p-1 hover:bg-slate-200 cursor-pointer rounded-md ${isOpen && `bg-slate-200 text-gray-950`}`}>
                <div className={`flex items-center w-full gap-2`}>
                    <span className={`flex items-center justify-center duration-200 ${sidebarState ? `text-[.9rem]` : `text-[1.2rem] w-full`}`}>{icon}</span>
                    <span className={`flex items-start w-full ${sidebarState ? `block` : `hidden`} font-semibold duration-300 text-[.8rem] text-nowrap`}>{label}</span>
                </div>
                <IoIosArrowDown className={`${isOpen ? 'rotate-180' : 'rotate-0'} ${sidebarState ? `block` : `hidden`} duration-150 ease-in-out`} />
            </div>
            <div className={`${isOpen && sidebarState ? 'flex' : 'hidden'} flex-col gap-2`}>
                {children}
            </div>
        </div>
    )
}