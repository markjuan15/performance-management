interface Iprops {
    children?: any,
}

export default function TH({ children }: Iprops) {

    return (
        <th className="px-6 py-2">
            {children}
        </th>
    )
}