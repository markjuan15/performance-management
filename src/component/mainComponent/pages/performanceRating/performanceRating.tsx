// import { useGetPerformanceRating } from "../../../../hooks/getInfoHook";
import MainLayout from "../../../../layout/main/mainLayout";
import {
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    TextInput,
    createTheme,
    ThemeProvider,
} from "flowbite-react";
import { useMemo, useState } from "react";
import { userData } from "./data/data";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useModalStates } from "../../../../hooks/store";
import PerformanceRatingModal from "./components/modal";

export default function PerformanceRating() {

    // const { mutate } = useGetPerformanceRating()
    const [selected, setSelected] = useState<any | null>(userData);

    const { performanceRatingModal, togglePerformanceRatingModal } = useModalStates()

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 10;

    const parsedRatings = useMemo(() => {
        return userData.pm_ratings.map((r: any) => {
            const data = JSON.parse(r.rating);
            return {
                id: r.id,
                createdAt: new Date(r.createdAt).toLocaleString(),
                ...data,
            };
        });
    }, []);

    const filtered = parsedRatings.filter((r: any) =>
        r.employeeInfo.employeeName.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const start = (page - 1) * perPage;
    const currentPageData = filtered.slice(start, start + perPage);

    const adjectival = (rating: number) => {
        if (rating >= 4.5) return "Outstanding";
        if (rating >= 4.0) return "Very Satisfactory";
        if (rating >= 3.0) return "Satisfactory";
        if (rating >= 2.0) return "Unsatisfactory";
        return "Poor";
    };

    const slimTableTheme = createTheme({
        table: {
            root: {
                base: "divide-y divide-slate-200 overflow-hidden rounded-sm shadow-sm/10",
            },
            head: {
                base: "text-xs uppercase tracking-wider",
                cell: {
                    base: "bg-slate-100 py-2 !rounded-none"
                }
            },
            body: {
                base: "text-xs p-2 divide-y divide-slate-100 text-slate-400",
                cell: {
                    base: "py-[.4rem]",
                }
            },
        },
    });

    const paginationTheme = createTheme({
        pages: {
            base: "mt-0 text-[.8rem] font-semibold",
        },
    })

    function handleModal(data: any) {
        setSelected(data)
        togglePerformanceRatingModal(performanceRatingModal)
    }

    return (
        <>
            <PerformanceRatingModal record={selected} />
            <MainLayout>
                <div className="flex flex-col w-full h-full gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={userData.avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h1 className="text-xl font-semibold">{userData.name}</h1>
                                <p className="text-sm text-gray-500">{userData.email}</p>
                            </div>
                        </div>
                        <TextInput
                            placeholder="Search employee name..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-60 p-0"
                        />
                    </div>

                    {/* DataTable */}
                    <ThemeProvider theme={slimTableTheme}>
                        <Table hoverable striped>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>Employee</TableHeadCell>
                                    <TableHeadCell>Position</TableHeadCell>
                                    <TableHeadCell>Review Period</TableHeadCell>
                                    <TableHeadCell>Final Rating</TableHeadCell>
                                    <TableHeadCell>Adjectival</TableHeadCell>
                                    <TableHeadCell>Created At</TableHeadCell>
                                    <TableHeadCell>Action</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentPageData.length > 0 ? (
                                    currentPageData.map((record, index) => (
                                        <TableRow key={index} className="hover:bg-gray-100">
                                            <TableCell>{record.employeeInfo.employeeName || "—"}</TableCell>
                                            <TableCell>{record.employeeInfo.employeePosition || "—"}</TableCell>
                                            <TableCell>{record.employeeInfo.reviewPeriod || "—"}</TableCell>
                                            <TableCell>
                                                {record.finalPerformanceRating.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {adjectival(record.finalPerformanceRating)}
                                            </TableCell>
                                            <TableCell>{record.createdAt}</TableCell>
                                            <TableCell>
                                                <button onClick={() => handleModal(record)} className="w-fit h-[1.3rem] px-2 rounded-sm bg-blue-400 capitalize font-semibold focus:ring-2 focus:ring-blue-600 ring-offset-1 hover:bg-blue-500 text-white cursor-pointer">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <FaMagnifyingGlass className="text-[.6rem]" />
                                                        <span className="">View</span>
                                                    </div>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-2 text-gray-500 font-bold"
                                        >
                                            No records found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ThemeProvider>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 leading-none">
                        <p className="">
                            Showing{" "}
                            <span className="font-medium">
                                {filtered.length === 0 ? 0 : start + 1}
                            </span>{" "}
                            to{" "}
                            <span className="font-medium">
                                {Math.min(start + perPage, filtered.length)}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium">{filtered.length}</span> entries
                        </p>
                        <div className="flex overflow-x-auto sm:justify-center">
                            <Pagination
                                theme={paginationTheme}
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPage}
                            />
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}