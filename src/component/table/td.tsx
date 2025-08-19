interface Iprops {
    children?: any,
    col?: number,
}

export default function TD({ children, col }: Iprops) {

    return (
        <td colSpan={col} className="px-6 py-2">
            {children}
        </td>
    )
}