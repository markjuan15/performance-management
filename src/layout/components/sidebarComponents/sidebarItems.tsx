import { FaStar } from "react-icons/fa6";
import { HiUser } from "react-icons/hi";
import { IoIosHome } from "react-icons/io";
import { PiIntersect } from "react-icons/pi";
import { SiMentorcruise } from "react-icons/si";
import { TbSquareAsteriskFilled } from "react-icons/tb";

export const Items = [
    { type: "item", label: "Home", link: "/", icon: <IoIosHome className="text-[.9rem]" /> },
    { type: "item", label: "Profile", link: "/profile", icon: <HiUser className="text-[.9rem]" /> },
    {
        type: "drop",
        label: "IPCRF",
        icon: <IoIosHome className="text-[.9rem]" />,
        items: [
            { label: "Performance Rating Form", link: "/", index: 3.1 },
            { label: "Template", link: "/", index: 3.2 },
            { label: "Development Plan", link: "/", index: 3.3 },
        ]
    },
    { type: "item", label: "Performance Rating", link: "/", icon: <FaStar className="text-[.9rem]" /> },
    { type: "item", label: "Performance Interventions", link: "/", icon: <PiIntersect className="text-[.9rem]" /> },
    { type: "item", label: "Coaching & Mentoring", link: "/", icon: <SiMentorcruise className="text-[.9rem]" /> },
    { type: "item", label: "Others", link: "/", icon: <TbSquareAsteriskFilled className="text-[.9rem]" /> },
]