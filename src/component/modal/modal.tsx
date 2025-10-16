import { IoIosCloseCircle } from "react-icons/io";
import { AnimatePresence, motion } from "motion/react";

interface Iprops {
    state?: boolean,
    children?: any,
    closeState?: any,
    title?: any,
}

export default function Modal({ state, children, closeState, title }: Iprops) {

    return (
        <AnimatePresence>
            {state && (
                <motion.div
                    key="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex fixed flex-col items-center justify-center bg-[#0000006e] w-screen h-screen z-20 top-0 left-0 backdrop-blur-[.03rem]">
                    <motion.div
                        key="modal-content"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            bounce: 0.3,
                        }}
                        className="flex flex-col items-center justify-center w-full md:w-auto lg:w-auto lg:min-w-[30rem] h-screen lg:h-auto bg-white md:rounded-md lg:rounded-md">
                        <div className="flex items-center justify-between w-full h-[3rem] border-b px-2 border-b-slate-300 relative">
                            <div />
                            <span className="font-montserrat">{title}</span>
                            <div onClick={closeState} className="rounded-full">
                                <IoIosCloseCircle className="cursor-pointer transition duration-500 active:scale-50 text-3xl text-slate-600" />
                            </div>
                        </div>
                        <div className="overflow-auto w-full h-full lg:max-h-[35rem] min-h-[10rem] scrollbar-none">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}