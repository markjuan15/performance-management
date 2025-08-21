interface Iprops {
    children?: any,
    col?: any,
}

export default function Table({ children }: Iprops) {

    return (
        <div className="relative overflow-x-auto border-[.05rem] border-slate-100 shadow-slate-300 shadow-xl/20 sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
                {children}
            </table>
        </div>
    )
}

export function TableBody({ children }: Iprops) {

    return (
        <tbody>
            {children}
        </tbody>
    )
}

export function TableBodyRow({ children }: Iprops) {

    return (
        <tr className="border-b last:border-b-0 bg-slate-50 border-slate-200">
            {children}
        </tr>
    )
}

export function TableHead({ children }: Iprops) {

    return (
        <thead className="text-xs uppercase bg-slate-200">
            {children}
        </thead>
    )
}

export function TableHeadRow({ children }: Iprops) {

    return (
        <tr>
            {children}
        </tr>
    )
}

export function TD({ children, col }: Iprops) {

    return (
        <td colSpan={col} className="px-6 py-2">
            {children}
        </td>
    )
}

export function TH({ children }: Iprops) {

    return (
        <th className="px-6 py-2">
            {children}
        </th>
    )
}