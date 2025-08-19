
interface Iprops {
    children?: any,
}

export default function TableHead({ children }: Iprops) {

    return (
        <thead className="text-xs uppercase bg-slate-200">
            {children}
        </thead>
    )
}