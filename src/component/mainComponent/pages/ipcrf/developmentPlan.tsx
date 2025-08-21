import MainLayout from "../../../../layout/main/mainLayout";
import Caption from "../../../table/caption";
import Table, { TableBody, TableBodyRow, TableHead, TableHeadRow, TD, TH } from "../../../table/table";
import { development_plan } from "./components/tableData";

export default function DevelopmentPlan() {

    return (
        <MainLayout>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-center w-full p-2">
                    <span className="font-semibold uppercase">Development Plan</span>
                </div>
                <div className="flex flex-col gap-4">
                    <Table>
                        <Caption>Development Plan</Caption>
                        <TableHead>
                            <TableHeadRow>
                                <TH>Development Need / Area for Improvement</TH>
                                <TH>Intervention / Learning Activity</TH>
                                <TH>Target Completion</TH>
                                <TH>Status / Remarks</TH>
                            </TableHeadRow>
                        </TableHead>
                        <TableBody>
                            {development_plan?.map((value: any, index: any) =>
                                <TableBodyRow key={index}>
                                    <TD>{value.dev_need}</TD>
                                    <TD>{value.learning_act}</TD>
                                    <TD>{value.target_completion}</TD>
                                    <TD>{value.status_remarks}</TD>
                                </TableBodyRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </MainLayout>
    )
}