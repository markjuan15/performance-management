import { useModalStates } from "../../../../../../hooks/store"
import Modal from "../../../../../modal/modal"

import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";

interface Iprops {
    record?: any;
}


export default function PerformanceRatingModal({ record }: Iprops) {

    const { performanceRatingModal, togglePerformanceRatingModal } = useModalStates()
    const { employeeInfo, kraRows, coreCompetencies, leadershipCompetencies, developmentPlan, totals } = record;

    function getAdjectivalRating(score: number): string {
        if (score >= 4.5) return "Outstanding";
        if (score >= 3.5) return "Very Satisfactory";
        if (score >= 2.5) return "Satisfactory";
        if (score >= 1.5) return "Unsatisfactory";
        return "Poor";
    }
    return (
        <Modal state={performanceRatingModal} closeState={() => togglePerformanceRatingModal(performanceRatingModal)} title={"Job Description"}>
            <div className="flex flex-col gap-2 w-screen lg:w-[70rem] p-2">
                {/* 🧾 Employee Info */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h2 className="font-semibold text-lg mb-3">Employee & Rater Information</h2>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <p><strong>Employee:</strong> {employeeInfo?.employeeName || "—"}</p>
                        <p><strong>Position:</strong> {employeeInfo?.employeePosition || "—"}</p>
                        <p><strong>Review Period:</strong> {employeeInfo?.reviewPeriod || "—"}</p>
                        <p><strong>Phase Date:</strong> {employeeInfo?.phaseDate || "—"}</p>
                        <p><strong>Rater:</strong> {employeeInfo?.raterName || "—"}</p>
                        <p><strong>Rater Position:</strong> {employeeInfo?.raterPosition || "—"}</p>
                        <p><strong>Bureau/Division:</strong> {employeeInfo?.bureauDivision || "—"}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="font-semibold text-lg mb-3">Part I: Key Result Areas (KRAs)</h2>
                    <Accordion alwaysOpen={false}>
                        {kraRows?.map((kra: any, idx: number) => (
                            <AccordionPanel key={kra?.id}>
                                <AccordionTitle>
                                    {`KRA ${idx + 1}`} – {kra?.kra || "Untitled"}
                                </AccordionTitle>
                                <AccordionContent>
                                    <div className="grid md:grid-cols-2 gap-2 text-sm mb-3">
                                        <p><strong>Objective:</strong> {kra?.objective || "—"}</p>
                                        <p><strong>Timeline:</strong> {kra?.timeline || "—"}</p>
                                        <p><strong>Weight:</strong> {kra?.weight}%</p>
                                        <p><strong>Target:</strong> {kra?.target || "—"}</p>
                                        <p><strong>MOV:</strong> {kra?.mov || "—"}</p>
                                    </div>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableHeadCell>Q</TableHeadCell>
                                                <TableHeadCell>E</TableHeadCell>
                                                <TableHeadCell>T</TableHeadCell>
                                                <TableHeadCell>Average</TableHeadCell>
                                                <TableHeadCell>Score</TableHeadCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{kra?.q}</TableCell>
                                                <TableCell>{kra?.e}</TableCell>
                                                <TableCell>{kra?.t}</TableCell>
                                                <TableCell>{kra?.avg || ((kra?.q + kra?.e + kra?.t) / 3).toFixed(2)}</TableCell>
                                                <TableCell>{kra?.score || "—"}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </AccordionContent>
                            </AccordionPanel>
                        ))}
                    </Accordion>
                    <div className="mt-4 text-sm text-right">
                        <p><strong>Overall Rating:</strong> {totals?.overallRating?.toFixed(2) || "—"}</p>
                    </div>
                </div>

                {/* 💪 Part II: Core and Leadership Competencies */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="font-semibold text-lg mb-3">Part II: Core and Leadership Competencies</h2>

                    {/* 🧭 Core Competencies */}
                    <h3 className="font-semibold text-md mb-2">Core Competencies</h3>
                    <div className="grid md:grid-cols-3 gap-2 text-sm mb-4">
                        {Object.entries(coreCompetencies || {}).map(([key, val]: [any, any | number]) => {
                            const label = key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (s: any) => s.toUpperCase())
                                .trim();

                            return (
                                <p key={key}>
                                    <strong>{label}</strong>: {String(val)}
                                </p>
                            );
                        })}
                    </div>

                    {/* 🧩 Leadership Competencies */}
                    <h3 className="font-semibold text-md mb-2">Leadership Competencies</h3>
                    <div className="grid md:grid-cols-3 gap-2 text-sm">
                        {Object.entries(leadershipCompetencies || {}).map(([key, val]: [any, any | number]) => {
                            const label = key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (s: any) => s.toUpperCase())
                                .trim();

                            return (
                                <p key={key}>
                                    <strong>{label}</strong>: {String(val)}
                                </p>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="font-semibold text-lg mb-3">Part III: Summary of Ratings</h2>
                    <Table className="text-sm">
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Section</TableHeadCell>
                                <TableHeadCell>Rating</TableHeadCell>
                                <TableHeadCell>Weight</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Part I — KRAs</TableCell>
                                <TableCell>{totals?.overallRating?.toFixed(2) || "—"}</TableCell>
                                <TableCell>70%</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Part II — Core Competencies</TableCell>
                                <TableCell>{record?.coreAverage?.toFixed(2) || "—"}</TableCell>
                                <TableCell>20%</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Part III — Leadership Competencies</TableCell>
                                <TableCell>{record?.leadershipAverage?.toFixed(2) || "—"}</TableCell>
                                <TableCell>10%</TableCell>
                            </TableRow>

                            <TableRow className="border-t font-semibold">
                                <TableCell>Final Rating</TableCell>
                                <TableCell>{record?.finalPerformanceRating?.toFixed(2) || "—"}</TableCell>
                                <TableCell>100%</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/* 🗒 Adjectival Rating */}
                    <div className="mt-2 text-sm">
                        <p>
                            <strong>Adjectival Rating: </strong>
                            {getAdjectivalRating(record?.finalPerformanceRating || 0)}
                        </p>
                    </div>
                </div>

                {/* 🪴 Development Plan */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h2 className="font-semibold text-lg mb-3">Part IV: Development Plan</h2>
                    <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <p><strong>Strengths:</strong> {developmentPlan?.strengths || "—"}</p>
                        <p><strong>Needs:</strong> {developmentPlan?.needs || "—"}</p>
                        <p><strong>Action Plan:</strong> {developmentPlan?.actionPlan || "—"}</p>
                        <p><strong>Timeline:</strong> {developmentPlan?.timeline || "—"}</p>
                        <p><strong>Resources:</strong> {developmentPlan?.resources || "—"}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}