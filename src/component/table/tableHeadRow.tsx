
interface Iprops {
    children?: any,
}

export default function TableHeadRow({ children }: Iprops) {

    return (
        <tr>
            {children}
        </tr>
    )
}