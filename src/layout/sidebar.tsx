import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiUsers } from "react-icons/hi";
import SidebarItems from "./components/sidebarItem";
import DropItem from "./components/dropItem";
import DropdownItems from "./components/dropdownItem";

export default function MySidebar() {

    return (
        <div className={`min-w-[13rem] duration-200 bg-white h-full`}>
            <div className="flex h-full flex-col select-none justify-between">
                <div className="flex flex-col overflow-auto scrollbar-none p-2">
                    <div className="flex flex-col gap-2">
                        <SidebarItems label={"Profile"} icon={<HiUser className="text-[1.2rem]" />} />
                        <SidebarItems label={"Dashboard"} icon={<HiChartPie className="text-[1.2rem]" />} />
                        <DropItem label={"Options"} icon={<HiTable className="text-[1.2rem]" />} >
                            <DropdownItems label={"Dashboard"} />
                            <DropdownItems label={"Dashboard"} />
                            <DropdownItems label={"Dashboard"} />
                        </DropItem>
                        <SidebarItems label={"Users List"} icon={<HiUsers className="text-[1.2rem]" />} />
                    </div>
                </div>
                <div className="flex flex-col">

                </div>
            </div>
        </div>
    )
}