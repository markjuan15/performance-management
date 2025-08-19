
interface Iprops {
    children?: any,
}

export default function TableBodyRow({ children }: Iprops) {

    return (
        <tr className="border-b last:border-b-0 bg-slate-50 border-slate-200">
            {children}
        </tr>
    )
}