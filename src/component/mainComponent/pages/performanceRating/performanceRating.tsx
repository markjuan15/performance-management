import { useGetPerformanceRating } from "../../../../hooks/getInfoHook";
import MainLayout from "../../../../layout/main/mainLayout";
import Caption from "../../../table/caption";
import Table, { TableBody, TableBodyRow, TableHead, TableHeadRow, TD, TH } from "../../../table/table";
import Cards from "../../components/cards";
import { rating_competency } from "../ipcrf/components/tableData";
import session from "../../../../hooks/supabaseHook"

export default function PerformanceRating() {

    const { mutate } = useGetPerformanceRating()

    return (
        <MainLayout>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-center w-full p-2">
                    <span onClick={() => mutate({ googleId: session?.id })} className="font-semibold uppercase">Performance Rating</span>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 p-4 rounded-md bg-slate-50">
                        <Cards title={"Employee Name:"} label={"John Doe"} />
                        <Cards title={"Position/Designation:"} label={"Administrative Staff"} />
                        <Cards title={"Department/Unit:"} label={"Registrar"} />
                        <Cards title={"Rating Period:"} from={"04/15/2025"} to={"08/21/2025"} type={"date"} />
                        <Cards title={"Rater/Supervisor:"} label={"John Doe"} />
                    </div>
                    <Table>
                        <Caption>Core Competencies</Caption>
                        <TableHead>
                            <TableHeadRow>
                                <TH>Competency</TH>
                                <TH>Description</TH>
                                <TH>Rating (1–5)</TH>
                            </TableHeadRow>
                        </TableHead>
                        <TableBody>
                            {rating_competency?.map((value: any, index: any) =>
                                <TableBodyRow key={index}>
                                    <TD>{value.competency}</TD>
                                    <TD>{value.description}</TD>
                                    <TD>{value.rating}</TD>
                                </TableBodyRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </MainLayout>
    )
}