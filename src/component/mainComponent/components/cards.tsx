
interface Iprops {
    label?: any,
    title?: any,
    type?: any,
    from?: any,
    to?: any,
}

export default function Card({ label, title, type, from, to }: Iprops) {
    return (type !== "date" ?
        <div className="flex gap-2">
            <span className="text-sm font-normal">{title}</span>
            <span className="text-sm font-semibold">{label}</span>
        </div>
        :
        <div className="flex gap-2">
            <span className="text-sm font-normal">{title}</span>
            <span className="flex gap-2 text-sm font-semibold"><span className="text-sm font-normal">From</span>{from}<span className="text-sm font-normal">to</span>{to}</span>
        </div>
    )
}