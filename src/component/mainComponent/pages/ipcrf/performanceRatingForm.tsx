import MainLayout from "../../../../layout/main/mainLayout";
import Caption from "../../../table/caption";
import Table from "../../../table/table";
import TableBody from "../../../table/tableBody";
import TableBodyRow from "../../../table/tableBodyRow";
import TableHead from "../../../table/tableHead";
import TableHeadRow from "../../../table/tableHeadRow";
import TD from "../../../table/td";
import TH from "../../../table/th";
import { competencies, functionalCompetencies, ratingSummary } from "./components/tableData";

export default function PerformanceRatingForm() {

    return (
        <MainLayout>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-center w-full p-2">
                    <span className="font-semibold uppercase">Performance Rating Form</span>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 p-4 rounded-md bg-slate-50">
                        <span className="text-sm font-normal">Employee Name:</span>
                        <span className="text-sm font-normal">Position:</span>
                        <span className="text-sm font-normal">Department:</span>
                        <span className="text-sm font-normal">Rating Period:</span>
                        <span className="text-sm font-normal">Rater:</span>
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
                            {competencies?.map((value: any, index: any) =>
                                <TableBodyRow key={index}>
                                    <TD>{value.competency}</TD>
                                    <TD>{value.description}</TD>
                                    <TD>{value.rating}</TD>
                                </TableBodyRow>
                            )}
                        </TableBody>
                    </Table>

                    <Table>
                        <Caption>Functional Competencies</Caption>
                        <TableHead>
                            <TableHeadRow>
                                <TH>KRA</TH>
                                <TH>Success Indicators</TH>
                                <TH>Rating (1–5)</TH>
                            </TableHeadRow>
                        </TableHead>
                        <TableBody>
                            {functionalCompetencies.length > 0
                                ? functionalCompetencies?.map((value: any, index: any) =>
                                    <TableBodyRow key={index}>
                                        <TD>{value.kra}</TD>
                                        <TD>{value.indicators}</TD>
                                        <TD>{value.rating}</TD>
                                    </TableBodyRow>
                                ) : <TableBodyRow>
                                    <TD col={3}><span className="flex items-center justify-center">No data</span></TD>
                                </TableBodyRow>
                            }
                        </TableBody>
                    </Table>

                    <Table>
                        <Caption>Final Rating Summary</Caption>
                        <TableHead>
                            <TableHeadRow>
                                <TH>Compenent</TH>
                                <TH>Weight</TH>
                                <TH>Score (1–5)</TH>
                            </TableHeadRow>
                        </TableHead>
                        <TableBody>
                            {ratingSummary.length > 0
                                ? ratingSummary?.map((value: any, index: any) =>
                                    <TableBodyRow key={index}>
                                        <TD>{value.component}</TD>
                                        <TD>{value.weight}</TD>
                                        <TD>{value.score}</TD>
                                    </TableBodyRow>
                                ) : <TableBodyRow>
                                    <TD col={3}><span className="flex items-center justify-center">No data</span></TD>
                                </TableBodyRow>
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </MainLayout>
    )
}