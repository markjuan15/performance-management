
interface Iprops {
    children?: any,
}

export default function Caption({ children }: Iprops) {

    return (
        <caption className="px-4 py-2 text-left rtl:text-right text-gray-900 bg-slate-50 font-semibold">
            {children}
        </caption>
    )
}