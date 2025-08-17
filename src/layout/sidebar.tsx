import { HiTable } from "react-icons/hi";
import SidebarItems from "./components/sidebarItem";
import DropItem from "./components/dropItem";
import DropdownItems from "./components/dropdownItem";
import { Items } from "./components/sidebarComponents/sidebarItems"

export default function MySidebar() {
    return (
        <div className={`min-w-[14rem] duration-200 bg-white h-full`}>
            <div className="flex h-full flex-col select-none justify-between">
                <div className="flex flex-col overflow-auto scrollbar-none p-2">
                    <div className="flex flex-col gap-2">
                        {Items?.map((value: any, index: any) =>
                            <>
                                {value.type === "item" ?
                                    <>
                                        {index === (Items.length - 1) && <div className="w-full h-[.05rem] my-2 bg-slate-600" />}
                                        <SidebarItems link={value.link} label={value.label} icon={value.icon} index={index} key={index} />
                                    </>
                                    :
                                    <DropItem label={"IPCRF"} icon={<HiTable className="text-[.9rem]" />} >
                                        {value?.items?.map((value: any, index: any) =>
                                            <>
                                                <DropdownItems link={value.link} index={value.index} label={value.label} key={index} />
                                            </>
                                        )}
                                    </DropItem>
                                }
                            </>
                        )}

                    </div>
                </div>
                <div className="flex flex-col p-2">

                </div>
            </div>
        </div>
    )
}