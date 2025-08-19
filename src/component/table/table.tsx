interface Iprops {
    children?: any,
}

export default function Table({ children }: Iprops) {

    return (
        <div className="relative overflow-x-auto border border-slate-50 shadow-slate-300 shadow-xl/20 sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
                {children}
            </table>
        </div>
    )
}