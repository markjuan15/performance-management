import Navbar from "../navbar";
import MySidebar from "../sidebar";

export default function MainLayout(props: any) {
    return (
        <div className="flex flex-col w-screen h-screen relative bg-slate-100 select-none overflow-hidden">
            <Navbar />
            <div className="flex w-full h-full overflow-hidden">
                <MySidebar />
                <div className="w-full h-full overflow-auto scrollbar-none p-4 relative">
                    {props.children}
                </div>
            </div>
        </div>
    )
}