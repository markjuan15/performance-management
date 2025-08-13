import { useState } from "react"
import { IoIosArrowDown } from "react-icons/io";

interface Iprops {
    icon?: any,
    label?: any,
    children?: any
}

export default function DropItem({ label, icon, children }: Iprops) {

    const [dropState, setDropState] = useState(false)

    return (
        <div className="flex flex-col gap-2">
            <div onClick={() => setDropState(!dropState)} className="flex items-center justify-between gap-2 text-[1rem] text-gray-700 hover:text-gray-800 py-1 hover:bg-slate-100 cursor-pointer px-3 rounded-md">
                <div className="flex items-center gap-2">
                    {icon}
                    <span className="font-semibold">{label}</span>
                </div>
                <IoIosArrowDown className={`${dropState ? 'rotate-180' : 'rotate-0'} duration-150 ease-in-out`} />
            </div>
            <div className={`${dropState ? 'flex' : 'hidden'} flex-col gap-2`}>
                {children}
            </div>
        </div>
    )
}