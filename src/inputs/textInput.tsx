
interface Iprops {
    register: any,
    errrMessage: any,
    label: any,
    icon?: any,
}

export default function TextInput({ register, errrMessage, label, icon }: Iprops) {
    return (
        <div className="flex items-center rounded-md overflow-hidden border border-slate-200 bg-white">
            <div className="flex items-center justify-center bg-slate-200 min-h-9 min-w-9">
                {icon}
            </div>
            <input {...register} placeholder={label} type="text" className="bg-transparent w-full h-9 p-2 outline-none border-none" />
            <span className="text-xs text-red-400">{errrMessage}</span>
        </div>
    )
}

export function TextInputSmall({ register, errrMessage, label, icon }: Iprops) {
    return (
        <div className="flex items-center rounded-md overflow-hidden border border-slate-200 bg-white">
            <div className="flex items-center justify-center bg-slate-200 min-h-8 min-w-7">
                {icon}
            </div>
            <input {...register} placeholder={label} type="text" className="bg-transparent w-full h-8 p-2 outline-none border-none text-sm" />
            <span className="text-xs text-red-400">{errrMessage}</span>
        </div>
    )
}

export function DateInputSmall({ register, errrMessage, label, icon }: Iprops) {
    return (
        <div className="flex items-center rounded-md border border-slate-200 bg-white relative">
            <div className="flex items-center w-full overflow-hidden">
                <div className="flex items-center justify-center bg-slate-200 min-h-8 min-w-7">
                    {icon}
                </div>
                <input {...register} placeholder={label} type="date" className="bg-transparent w-full h-8 p-2 outline-none border-none text-sm" />
                <span className="text-xs text-red-400">{errrMessage}</span>
            </div>
            <span className="absolute text-xs -top-2 left-[2.1rem] bg-white text-slate-500 px-[.2rem]">{label}</span>
        </div>
    )
}