import MainLayout from "../../../../layout/main/mainLayout";
import { IoMdDownload, IoMdPrint } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import avatar from "../../../../assets/avatar.jpg"
import ProfileModal from "./modal/profileModal";
import { useModalStates } from "../../../../hooks/store";

export default function Profile() {

    return (
        <>
            <ProfileModal />
            <MainLayout>
                <div className="flex flex-col lg:grid lg:grid-cols-3 w-full h-full gap-4">
                    <div className="flex items-center justify-center w-full bg-slate-50 shadow-xl/10 rounded-md p-2">
                        <div className="bg-white p-2 rounded-full shadow-xl/10">
                            <img src={avatar} alt="" className="md:w-[17rem] md:h-[17rem] w-[10rem] h-[10rem] rounded-full" />
                        </div>
                    </div>
                    <div className="grid grid-rows-4 gap-4">
                        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 shadow-xl/10 rounded-md leading-none">
                            <span className="flex items-center justify-center text-[2.5rem] w-full uppercase font-bebas">Administrative Staff</span>
                            <span className="flex items-center justify-center text-[.7rem] w-full uppercase font-montserrat">Registrar’s Office</span>
                        </div>
                        <div className="row-span-3 w-full h-full bg-slate-50 shadow-xl/10 rounded-md p-4 relative">
                            <button className="flex items-center justify-center w-5 h-5 rounded-md cursor-pointer focus:ring-2 bg-green-400 focus:ring-green-600 ring-offset-1 hover:bg-green-500 absolute right-4 top-4">
                                <MdEdit className="text-slate-800" />
                            </button>
                            <div className="flex flex-col leading-none p-4">
                                <span className="flex items-center justify-center text-[2rem] w-full uppercase font-bebas">John Doe</span>
                                <span className="flex items-center justify-center text-[.7rem] w-full uppercase font-montserrat">JD-0002</span>
                            </div>
                            <div className="flex flex-col gap-4 text-[.8rem]">
                                <div className="flex flex-col gap-1 font-montserrat">
                                    <span className="uppercase font-montserrat font-semibold">Employee details</span>
                                    <div className="flex gap-2">
                                        <span className="font-semibold">Address:</span>
                                        <span className="italic">Paniki, Bagabag, Nueva Vizcaya</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold">Age: </span>
                                        <span className="italic">26</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold">Sex: </span>
                                        <span className="italic">Male</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold">Status: </span>
                                        <span className="italic">Single</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 font-montserrat">
                                    <span className="uppercase font-montserrat font-semibold">Contact information</span>
                                    <div className="flex gap-2">
                                        <span className="font-semibold">Mobile number: </span>
                                        <span className="italic">09655516465</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold">Email address: </span>
                                        <span className="italic">johndoe@yahoo.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full mt-4 text-[.8rem]">
                                <span className="uppercase font-montserrat font-semibold">Job Summary</span>
                                <span className="text-[.8rem] w-full font-montserrat">Provides clerical and administrative support to ensure smooth operations of the office, including documentation, filing, and communication handling.</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-4 w-full h-full bg-slate-50 shadow-xl/10 rounded-md relative">
                        <button className="flex items-center justify-center w-5 h-5 rounded-md cursor-pointer focus:ring-2 bg-green-400 focus:ring-green-600 ring-offset-1 hover:bg-green-500 absolute right-4 top-4">
                            <MdEdit className="text-slate-800" />
                        </button>
                        <span className="flex items-center justify-center text-[2.5rem] w-full uppercase font-bebas">Job Description</span>
                        <div className="flex flex-col h-full w-full justify-between gap-4">
                            <div className="flex flex-col h-full text-[.8rem] gap-4 p-4 pt-0">
                                <div className="flex flex-col font-montserrat">
                                    <span className="uppercase font-montserrat font-semibold">Key Responsibilities</span>
                                    <div className="flex flex-col gap-2 leading-none">
                                        <li><span className="italic">Handle filing, data entry, and document management.</span></li>
                                        <li><span className="italic">Assist in preparing reports, memos, and correspondence.</span></li>
                                        <li><span className="italic">Manage schedules, appointments, and meeting logistics.</span></li>
                                        <li><span className="italic">Provide customer service to students, faculty, and visitors.</span></li>
                                        <li><span className="italic">Support events, programs, and office initiatives.</span></li>
                                    </div>
                                </div>
                                <div className="flex flex-col font-montserrat">
                                    <span className="uppercase font-montserrat font-semibold">Qualifications</span>
                                    <div className="flex flex-col gap-2 leading-none">
                                        <li><span className="italic">Bachelor’s Degree in Office Administration, Business Administration, or related field.</span></li>
                                        <li><span className="italic">Proficiency in MS Office and database systems.</span></li>
                                        <li><span className="italic">Strong organizational and multitasking skills.</span></li>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => useModalStates.setState({ profileModal: true })} className="w-full h-[2rem] rounded-md bg-green-400 capitalize font-semibold focus:ring-2 focus:ring-green-600 ring-offset-1 hover:bg-green-500 text-white cursor-pointer">
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="">download</span>
                                        <IoMdDownload />
                                    </div>
                                </button>
                                <button className="w-full h-[2rem] rounded-md bg-blue-400 capitalize font-semibold focus:ring-2 focus:ring-blue-600 ring-offset-1 hover:bg-blue-500 text-white cursor-pointer">
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="">print</span>
                                        <IoMdPrint />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}