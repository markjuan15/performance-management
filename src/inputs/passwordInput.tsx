import { useState } from "react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

interface Iprops {
    register: any,
    errrMessage: any,
    label: any
    icon?: any
}

export default function PasswordInput({ register, errrMessage, label, icon }: Iprops) {

    const [showHide, setShowHide] = useState(false)

    function showHideIcon() {
        setShowHide(!showHide)
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center rounded-md overflow-hidden border border-slate-200 bg-white">
                <div className="flex items-center justify-center bg-slate-200 min-h-9 min-w-9">
                    {icon}
                </div>
                <input {...register} type={showHide ? "text" : "password"} placeholder={label} className="bg-transparent w-full h-9 p-2 outline-none border-none" />
                <div className="flex items-center justify-center bg-slate-200 min-h-9 min-w-9">
                    <div onClick={showHideIcon}>
                        {showHide ? <BiHide className="text-2xl text-amber-500" /> : <BiShow className="text-2xl text-slate-500" />}
                    </div>
                </div>
            </div>
            <span className="text-xs text-red-400">{errrMessage}</span>
        </div>
    )
}