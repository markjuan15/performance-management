import MainLayout from "../../../../layout/main/mainLayout";
import Caption from "../../../table/caption";
import { competencies_template, objectives } from "./components/tableData";
import Table, { TableBody, TableBodyRow, TableHead, TableHeadRow, TD, TH } from "../../../table/table";

export default function Template() {

    return (
        <MainLayout>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-center w-full p-2">
                    <span className="font-semibold uppercase">Template</span>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 p-4 rounded-md bg-slate-50">
                        <span className="text-sm font-normal">Employee Name:</span>
                        <span className="text-sm font-normal">Position/Designation:</span>
                        <span className="text-sm font-normal">School/Office:</span>
                        <span className="text-sm font-normal">Rating Period:</span>
                        <span className="text-sm font-normal">Rater/Supervisor:</span>
                    </div>
                    <Table>
                        <Caption>Objectives & Success Indicators (Performance Commitment)</Caption>
                        <TableHead>
                            <TableHeadRow>
                                <TH>KRA</TH>
                                <TH>Objectives</TH>
                                <TH>Success Indicators</TH>
                                <TH>Weight (%)</TH>
                                <TH>Actual Accomplishments</TH>
                                <TH>Rating (1–5)</TH>
                                <TH>Score (Weight×Rating)</TH>
                            </TableHeadRow>
                        </TableHead>
                        <TableBody>
                            {objectives?.map((value: any, index: any) =>
                                <TableBodyRow key={index}>
                                    <TD>{value.kra}</TD>
                                    <TD>{value.objectives}</TD>
                                    <TD>{value.success_indicators}</TD>
                                    <TD>{value.weight}</TD>
                                    <TD>{value.actual_accomplishments}</TD>
                                    <TD>{value.rating}</TD>
                                    <TD>{value.score}</TD>
                                </TableBodyRow>
                            )}
                        </TableBody>
                    </Table>

                    <Table>
                        <Caption>Functional Competencies</Caption>
                        <TableHead>
                            <TableHeadRow>
                                <TH>Competency</TH>
                                <TH>Description</TH>
                                <TH>Rating (1–5)</TH>
                            </TableHeadRow>
                        </TableHead>
                        <TableBody>
                            {competencies_template.length > 0
                                ? competencies_template?.map((value: any, index: any) =>
                                    <TableBodyRow key={index}>
                                        <TD>{value.competency}</TD>
                                        <TD>{value.description}</TD>
                                        <TD>{value.rating}</TD>
                                    </TableBodyRow>
                                ) : <TableBodyRow>
                                    <TD col={3}><span className="flex items-center justify-center">No data</span></TD>
                                </TableBodyRow>
                            }
                        </TableBody>
                    </Table>

                    <div className="flex flex-col gap-2 p-4 rounded-md bg-slate-50">
                        <span className="font-semibold">Final Computation</span>
                        <div className="flex flex-col w-[15rem]">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-normal">Total KRA Score:</span>
                                <span className="text-sm font-normal"></span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-normal">Average Competency Score:</span>
                                <span className="text-sm font-normal"></span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-normal">Final Rating:</span>
                                <span className="text-sm font-normal"></span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-normal">Adjectival Rating:</span>
                                <span className="text-sm font-normal"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}