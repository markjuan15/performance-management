import { FaStar } from "react-icons/fa6";
import { HiTable, HiUser } from "react-icons/hi";
import { IoIosHome } from "react-icons/io";
import { PiIntersect } from "react-icons/pi";
import { SiMentorcruise } from "react-icons/si";
import { TbSquareAsteriskFilled } from "react-icons/tb";

export const Items = [
    { type: "item", label: "Home", link: "/", icon: <IoIosHome /> },
    { type: "item", label: "Profile", link: "/profile", icon: <HiUser /> },
    {
        type: "drop",
        label: "IPCRF",
        icon: <HiTable />,
        items: [
            { label: "Performance Rating Form", link: "/performance-rating-form", index: 3.1 },
            { label: "Template", link: "/template", index: 3.2 },
            { label: "Development Plan", link: "/development-plan", index: 3.3 },
        ]
    },
    { type: "item", label: "Performance Rating", link: "/performance-rating", icon: <FaStar /> },
    { type: "item", label: "Performance Interventions", link: "/performance-interventions", icon: <PiIntersect /> },
    { type: "item", label: "Coaching & Mentoring", link: "/coaching-mentoring", icon: <SiMentorcruise /> },
    // { type: "item", label: "Others", link: "/others", icon: <TbSquareAsteriskFilled /> },
    {
        type: "drop",
        label: "Others",
        icon: <TbSquareAsteriskFilled />,
        items: [
            { label: "Performance Rating Form", link: "/performance-rating-form", index: 6.1 },
            { label: "Template", link: "/template", index: 6.2 },
            { label: "Development Plan", link: "/development-plan", index: 6.3 },
        ]
    }
]