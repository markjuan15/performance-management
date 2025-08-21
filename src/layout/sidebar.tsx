import SidebarItems from "./components/sidebarItem";
import DropItem from "./components/dropItem";
import DropdownItems from "./components/dropdownItem";
import { Items } from "./components/sidebarComponents/sidebarItems"
import { IoMdArrowRoundForward } from "react-icons/io";
import { useSidebarStates } from "../hooks/store";

export default function MySidebar() {
    const { sidebarState, toggleSidebarState } = useSidebarStates()

    return (
        <div className={`bg-white h-full transition-all duration-200 ease-in-out ${sidebarState ? `min-w-[14rem]` : `w-[4rem]`} relative`}>
            <div onClick={() => toggleSidebarState(sidebarState)} className="flex items-center justify-center bg-green-300 rounded-full p-[.15rem] absolute -right-[.5rem] top-0 leading-none cursor-pointer z-10">
                <IoMdArrowRoundForward className={`text-slate-700 font-bold text-[.8rem] duration-200 ${sidebarState ? `rotate-180` : `rotate-0`}`} />
            </div>
            <div className="flex h-full flex-col select-none justify-between">
                <div className="flex flex-col overflow-auto scrollbar-none p-2 relative">
                    <div className="flex flex-col gap-2">
                        {Items?.map((value: any, index: any) =>
                            <div key={index}>
                                {value.type === "item" ?
                                    <div key={index}>
                                        {index === (Items.length - 1) && <div className="w-full h-[.05rem] my-2 bg-slate-600" />}
                                        <SidebarItems link={value.link} label={value.label} icon={value.icon} index={index} key={index} />
                                    </div>
                                    :
                                    <DropItem label={value.label} icon={value.icon} index={index} >
                                        {value?.items?.map((value: any, index: any) =>
                                            <>
                                                <DropdownItems link={value.link} index={value.index} label={value.label} key={index} />
                                            </>
                                        )}
                                    </DropItem>
                                }
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex flex-col p-2">

                </div>
            </div>
        </div>
    )
}