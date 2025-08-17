import { IoIosCloseCircle } from "react-icons/io";

interface Iprops {
    state?: boolean,
    children?: any,
    closeState?: any,
    title?: any,
}

export default function Modal({ state, children, closeState, title }: Iprops) {

    return state ? (
        <div className="flex fixed flex-col items-center justify-center bg-[#00000091] w-screen h-screen z-10 top-0 left-0 backdrop-blur-[.05rem]">
            <div className="flex flex-col items-center justify-center w-screen lg:w-[40rem] h-auto bg-white rounded-md">
                <div className="flex items-center justify-center w-full h-[3rem] border-b border-b-slate-300 relative">
                    <span className="font-montserrat">{title}</span>
                    <div onClick={closeState} className="absolute top-2 right-2 rounded-full">
                        <IoIosCloseCircle className="cursor-pointer transition duration-500 active:scale-50 text-3xl text-slate-600" />
                    </div>
                </div>
                <div className="overflow-auto max-h-[30rem] min-h-[10rem] scrollbar-none">
                    {children}
                </div>
            </div>
        </div>
    ) : null
}