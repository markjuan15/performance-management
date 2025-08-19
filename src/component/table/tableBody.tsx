
interface Iprops {
    children?: any,
}

export default function TableBody({ children }: Iprops) {

    return (
        <tbody>
            {children}
        </tbody>
    )
}