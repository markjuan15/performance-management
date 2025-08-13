
interface Iprops {
    icon?: any,
    label?: any,
}
export default function SidebarItems({ label, icon }: Iprops) {

    return (
        <div className="flex items-center gap-2 text-[1rem] text-gray-700 hover:text-gray-800 py-1 hover:bg-slate-100 cursor-pointer px-3 rounded-md">
            {icon}
            <span className="font-semibold">{label}</span>
        </div>
    )
}