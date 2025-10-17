import { IoIosArrowDown } from "react-icons/io";
import { FaTrashCan, FaPlus } from 'react-icons/fa6';
import MainLayout from "../../../../layout/main/mainLayout";
// import Caption from "../../../table/caption";
// import Table, { TableBody, TableBodyRow, TableHead, TableHeadRow, TD, TH } from "../../../table/table";
// import { competencies, functionalCompetencies, ratingSummary } from "./components/tableData";

import { useState, useMemo } from "react";
import { useSavePerformanceForm } from "../../../../hooks/getInfoHook";
import session from "../../../../hooks/supabaseHook";
import PerformanceRatingFormModal from "./components/modal";
import { useModalStates } from "../../../../hooks/store";

type KRAItem = {
    id: string;
    mfo: string;
    kra: string;
    objective: string;
    timeline: string;
    weight: number;
    target: string;
    mov: string;
    q: number;
    e: number;
    t: number;
    collapsed: boolean;
};

const DEFAULT_KRA = (): KRAItem => ({
    id: String(Date.now()) + Math.random().toString(36).slice(2, 7),
    mfo: "",
    kra: "",
    objective: "",
    timeline: "",
    weight: 0,
    target: "",
    mov: "",
    q: 1,
    e: 1,
    t: 1,
    collapsed: false,
});

const ADJECTIVAL = new Map<number, string>([
    [5, "Outstanding"],
    [4, "Very Satisfactory"],
    [3, "Satisfactory"],
    [2, "Unsatisfactory"],
    [1, "Poor"],
]);

export default function PerformanceRatingForm() {

    const { mutate } = useSavePerformanceForm()

    const [kraRows, setKraRows] = useState<KRAItem[]>([DEFAULT_KRA()]);
    const [employeeName, setEmployeeName] = useState("");
    const [employeePosition, setEmployeePosition] = useState("");
    const [reviewPeriod, setReviewPeriod] = useState("");
    const [phaseDate, setPhaseDate] = useState("");
    const [raterName, setRaterName] = useState("");
    const [raterPosition, setRaterPosition] = useState("");
    const [bureauDivision, setBureauDivision] = useState("");
    const [coreCompetencies, setCoreCompetencies] = useState({
        selfManagement: 1,
        professionalism: 1,
        resultFocus: 1,
        teamwork: 1,
        serviceOrientation: 1,
        innovation: 1,
    })
    const [leadershipCompetencies, setLeadershipCompetencies] = useState({
        leadingPeople: 1,
        peopleDevelopment: 1,
        peoplePerformanceMgmt: 1,
    })
    const [developmentPlan, setDevelopmentPlan] = useState({
        strengths: "",
        needs: "",
        actionPlan: "",
        timeline: "",
        resources: "",
    })
    const updateKRA = (id: string, partial: Partial<KRAItem>) => {
        setKraRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...partial } : r)));
    }
    const addKRA = () => {
        setKraRows((prev) => {
            const collapsedPrev = prev.map((r) => ({ ...r, collapsed: true }));
            return [...collapsedPrev, DEFAULT_KRA()];
        })
    }
    const removeKRA = (id: string) => setKraRows((p) => p.filter((r) => r.id !== id));
    const toggleCollapse = (id: string) => {
        setKraRows((prev) => prev.map((r) => (r.id === id ? { ...r, collapsed: !r.collapsed } : r)));
    }
    const totals = useMemo(() => {
        const rows = kraRows.map((r) => {
            const avg = (r.q + r.e + r.t) / 3;
            const score = (avg * (r.weight || 0)) / 100;
            return { ...r, avg, score };
        });
        const totalWeight = rows.reduce((s, r) => s + (r.weight || 0), 0);
        const totalScore = rows.reduce((s, r) => s + r.score, 0);
        const overallRating = rows.length ? rows.reduce((s, r) => s + r.avg, 0) / rows.length : 0;
        return { rows, totalWeight, totalScore, overallRating };
    }, [kraRows])

    const coreAverage = useMemo(() => {
        const vals = Object.values(coreCompetencies);
        return vals.reduce((s, v) => s + Number(v), 0) / vals.length;
    }, [coreCompetencies])

    const leadershipAverage = useMemo(() => {
        const vals = Object.values(leadershipCompetencies);
        return vals.reduce((s, v) => s + Number(v), 0) / vals.length;
    }, [leadershipCompetencies])

    const finalPerformanceRating = useMemo(() => {
        const k = (totals.overallRating || 0) * 0.7;
        const c = (coreAverage || 0) * 0.2;
        const l = (leadershipAverage || 0) * 0.1;
        return k + c + l
    }, [totals, coreAverage, leadershipAverage])

    const { performanceRatingFormModal, togglePerformanceRatingFormModal } = useModalStates()
    const handleSubmit = async () => {
        const payload = [{
            employeeInfo: {
                employeeName,
                employeePosition,
                reviewPeriod,
                phaseDate,
                raterName,
                raterPosition,
                bureauDivision,
            },
            kraRows,
            totals,
            coreCompetencies,
            coreAverage,
            leadershipCompetencies,
            leadershipAverage,
            developmentPlan,
            finalPerformanceRating,
        }, {
            googleId: session?.id
        }];
        togglePerformanceRatingFormModal(performanceRatingFormModal)
        await mutate(JSON.stringify(payload))
    }

    return (
        <>
            <PerformanceRatingFormModal onCancel={() => togglePerformanceRatingFormModal(performanceRatingFormModal)} onConfirm={() => handleSubmit()} />
            <MainLayout>
                <div className="min-h-screen">
                    <div className="flex flex-col gap-4">
                        <header className="flex justify-center items-center flex-wrap">
                            <div>
                                <h1 className="text-2xl font-bold">Individual Performance Commitment and Review Form (IPCRF)</h1>
                            </div>
                        </header>

                        <section className="bg-white rounded-lg shadow-md/20 border border-slate-100 p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <Input label="Name of Employee" value={employeeName} onChange={setEmployeeName} />
                                    <Input label="Position" value={employeePosition} onChange={setEmployeePosition} />
                                    <Input label="Review Period" value={reviewPeriod} onChange={setReviewPeriod} />
                                    <Input label="Date of Phase III" type="date" value={phaseDate} onChange={setPhaseDate} />
                                </div>
                                <div className="space-y-3">
                                    <Input label="Name of Rater" value={raterName} onChange={setRaterName} />
                                    <Input label="Position" value={raterPosition} onChange={setRaterPosition} />
                                    <Input label="Bureau/Center/Service/Division" value={bureauDivision} onChange={setBureauDivision} />
                                </div>
                            </div>
                        </section>

                        {/* Part I */}
                        <section>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-start gap-4">
                                    <h2 className="text-lg font-semibold">Part I — Key Result Areas</h2>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {totals.rows.map((r) => {
                                        const expandedMaxH = 2000;
                                        return (
                                            <div key={r.id} className="bg-white rounded-md shadow-md/20 relative">
                                                <button type="button" onClick={() => removeKRA(r.id)} className={`text-red-500 p-2 rounded-full bg-red-200 text-[.9rem] absolute -right-3 -top-3 cursor-pointer transition-all duration-300 ${totals.rows.length <= 1 && `opacity-0 invisible`}`} disabled={totals.rows.length <= 1}>
                                                    <FaTrashCan />
                                                </button>
                                                <div onClick={() => toggleCollapse(r.id)} className="cursor-pointer bg-slate-100 p-3 flex justify-between items-center rounded-t-md">
                                                    <h3 className="font-semibold text-indigo-700">
                                                        {r.kra || "New KRA"}
                                                    </h3>
                                                    <div className="flex justify-end">
                                                        <span className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                                            <IoIosArrowDown className={`${r.collapsed ? 'rotate-0' : 'rotate-180'} duration-150 ease-in-out`} />
                                                            {r.collapsed ? "Expand" : "Collapse"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="transition-all duration-300 ease-in-out" style={{ maxHeight: r.collapsed ? 0 : expandedMaxH, }} >
                                                    <div className={`p-4 transition-opacity duration-300 ${r.collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                                                        <div className="flex flex-col gap-3">
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <Input label="MFO" value={r.mfo} onChange={(v: any) => updateKRA(r.id, { mfo: v })} />
                                                                <Input label="KRA" value={r.kra} onChange={(v: any) => updateKRA(r.id, { kra: v })} />
                                                            </div>
                                                            <TeaxtArea label="Objective" value={r.objective} onChange={(v: any) => updateKRA(r.id, { objective: v })} />
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <Input label="Timeline" value={r.timeline} onChange={(v: any) => updateKRA(r.id, { timeline: v })} />
                                                                <Input label="Weight (%)" type="number" value={r.weight} onChange={(v: any) => updateKRA(r.id, { weight: Number(v) })} />
                                                            </div>
                                                            <Input label="Target" value={r.target} onChange={(v: any) => updateKRA(r.id, { target: v })} />
                                                            <TeaxtArea label="MOV / Actual Result" value={r.mov} onChange={(v: any) => updateKRA(r.id, { mov: v })} />
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <SelectRating label="Q" value={r.q} onChange={(v: any) => updateKRA(r.id, { q: v })} />
                                                                <SelectRating label="E" value={r.e} onChange={(v: any) => updateKRA(r.id, { e: v })} />
                                                                <SelectRating label="T" value={r.t} onChange={(v: any) => updateKRA(r.id, { t: v })} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between text-sm bg-slate-100 px-4 py-2 rounded-b-md">
                                                    <span>Average: <strong>{(r.avg || 0).toFixed(2)}</strong></span>
                                                    <span>Score: <strong>{(r.score || 0).toFixed(2)}</strong></span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <button onClick={addKRA} className="flex  items-center justify-center text-center bg-blue-500 text-white p-3 rounded-md shadow-md/20 cursor-pointer">
                                    <FaPlus />
                                </button>

                                <div className="text-sm text-gray-600">
                                    Total Weight: <strong>{totals.totalWeight}%</strong> | Overall Avg: <strong>{totals.overallRating.toFixed(2)}</strong> | Total Score: <strong>{totals.totalScore.toFixed(2)}</strong>
                                </div>
                            </div>
                        </section>

                        {/* Part II */}
                        <section>
                            <h2 className="text-lg font-semibold mb-3">Part II — Competencies</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Card title="Core Behavioral Competencies">
                                    {Object.entries(coreCompetencies).map(([key, val]) => (
                                        <CompetencyRow key={key} label={key} value={val} onChange={(v: number) => setCoreCompetencies((s) => ({ ...s, [key]: v }))} />
                                    ))}
                                    <div className="mt-3 text-sm">
                                        Average: <strong>{coreAverage.toFixed(2)}</strong> ({ADJECTIVAL.get(Math.round(coreAverage))})
                                    </div>
                                </Card>

                                <Card title="Leadership Competencies">
                                    {Object.entries(leadershipCompetencies).map(([key, val]) => (
                                        <CompetencyRow key={key} label={key} value={val} onChange={(v: number) => setLeadershipCompetencies((s) => ({ ...s, [key]: v }))} />
                                    ))}
                                    <div className="mt-3 text-sm">
                                        Average: <strong>{leadershipAverage.toFixed(2)}</strong> ({ADJECTIVAL.get(Math.round(leadershipAverage))})
                                    </div>
                                </Card>
                            </div>
                        </section>

                        {/* Part III */}
                        <section>
                            <h2 className="text-lg font-semibold mb-3">Part III — Summary of Ratings</h2>
                            <div className="bbg-white rounded-lg shadow-md/20 border border-slate-100 p-4">
                                <table className="w-full">
                                    <thead className="text-gray-600">
                                        <tr>
                                            <th className="text-left py-1">Section</th>
                                            <th className="text-right py-1">Rating</th>
                                            <th className="text-right py-1">Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Part I — KRAs</td><td className="text-right">{totals.overallRating.toFixed(2)}</td><td className="text-right">70%</td></tr>
                                        <tr><td>Part II — Core Competencies</td><td className="text-right">{coreAverage.toFixed(2)}</td><td className="text-right">20%</td></tr>
                                        <tr><td>Part II — Leadership Competencies</td><td className="text-right">{leadershipAverage.toFixed(2)}</td><td className="text-right">10%</td></tr>
                                        <tr className="font-semibold border-t"><td>Final Rating</td><td className="text-right">{finalPerformanceRating.toFixed(2)}</td><td className="text-right">100%</td></tr>
                                    </tbody>
                                </table>
                                <div className="mt-2 text-sm text-gray-700">
                                    Adjectival Rating: <strong>{ADJECTIVAL.get(Math.round(finalPerformanceRating))}</strong>
                                </div>
                            </div>
                        </section>

                        {/* Part IV */}
                        <section>
                            <h2 className="text-lg font-semibold mb-3">Part IV — Development Plan</h2>
                            <div className="bg-white rounded-lg shadow-md/20 border border-slate-100 p-4 grid md:grid-cols-2 gap-4">
                                <TeaxtArea2 label="Strengths" value={developmentPlan?.strengths} onChange={(e: any) => setDevelopmentPlan((s) => ({ ...s, strengths: e?.target?.value }))} className="p-2 border rounded h-24" />
                                <TeaxtArea2 label="Development Needs" value={developmentPlan?.needs} onChange={(e: any) => setDevelopmentPlan((s) => ({ ...s, needs: e?.target?.value }))} className="p-2 border rounded h-24" />
                                <TeaxtArea2 label="Action Plan / Recommended Intervention" value={developmentPlan?.actionPlan} onChange={(e: any) => setDevelopmentPlan((s) => ({ ...s, actionPlan: e?.target?.value }))} className="p-2 border rounded h-24 md:col-span-2" />
                                <Input label="Timeline" value={developmentPlan?.timeline} onChange={(v: any) => setDevelopmentPlan((s) => ({ ...s, timeline: v }))} />
                                <Input label="Resources Needed" value={developmentPlan?.resources} onChange={(v: any) => setDevelopmentPlan((s) => ({ ...s, resources: v }))} />
                            </div>
                        </section>

                        <div className="flex justify-end">
                            <button onClick={() => togglePerformanceRatingFormModal(performanceRatingFormModal)} className="bg-blue-600 text-white px-4 py-1 rounded shadow cursor-pointer">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

function Input({ label, value, onChange, type = "text" }: any) {
    return (
        <div className="relative w-full">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-slate-500">
                {label}
            </label>
            <input
                type={type}
                value={value} onChange={(e) => onChange(e.target.value)}
                className="bg-transparent w-full border border-gray-400 text-gray-600 placeholder-gray-500 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );
}

function TeaxtArea({ label, value, onChange }: any) {
    return (
        <div className="relative w-full">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-slate-500">
                {label}
            </label>
            <textarea
                value={value} onChange={(e) => onChange(e.target.value)}
                placeholder="Write your message here..."
                className="w-full bg-transparent border border-gray-400 text-slate-500 placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            ></textarea>
        </div>
    );
}

function TeaxtArea2({ label, value, onChange }: any) {
    return (
        <div className="relative w-full">
            <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-semibold text-slate-500">
                {label}
            </label>
            <textarea
                value={value} onChange={onChange}
                placeholder="Write your message here..."
                className="w-full bg-transparent border border-gray-400 text-slate-500 placeholder-gray-500 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            ></textarea>
        </div>
    );
}

function SelectRating({ label, value, onChange }: any) {
    return (
        <label className="block text-sm">
            <div className="text-xs text-gray-600 mb-1">{label}</div>
            <select value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full p-2 border rounded">
                <option value={5}>5 — Outstanding</option>
                <option value={4}>4 — Very Satisfactory</option>
                <option value={3}>3 — Satisfactory</option>
                <option value={2}>2 — Unsatisfactory</option>
                <option value={1}>1 — Poor</option>
            </select>
        </label>
    );
}

function Card({ title, children }: any) {
    return (
        <div className="bg-white rounded-lg shadow-md/20 border border-slate-100 p-4">
            <h3 className="font-semibold mb-2 text-indigo-700">{title}</h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}

function CompetencyRow({ label, value, onChange }: any) {
    return (
        <div className="flex justify-between items-center border-b pb-2">
            <div className="text-sm capitalize">{label.replace(/([A-Z])/g, ' $1')}</div>
            <select value={value} onChange={(e) => onChange(Number(e.target.value))} className="border rounded p-1 w-28">
                <option value={5}>5 — Role Model</option>
                <option value={4}>4 — Consistently Demonstrates</option>
                <option value={3}>3 — Most of the Time</option>
                <option value={2}>2 — Sometimes</option>
                <option value={1}>1 — Rarely</option>
            </select>
        </div>
    );
}


// export default function PerformanceRatingForm() {

//     return (
//         <MainLayout>
//             <div className="flex flex-col w-full">
//                 <div className="flex items-center justify-center w-full p-2">
//                     <span className="font-semibold uppercase">Performance Rating Form</span>
//                 </div>
//                 <div className="flex flex-col gap-4">
//                     <div className="flex flex-col gap-2 p-4 rounded-md bg-slate-50">
//                         <span className="text-sm font-normal">Employee Name:</span>
//                         <span className="text-sm font-normal">Position:</span>
//                         <span className="text-sm font-normal">Department:</span>
//                         <span className="text-sm font-normal">Rating Period:</span>
//                         <span className="text-sm font-normal">Rater:</span>
//                     </div>
//                     <Table>
//                         <Caption>Core Competencies</Caption>
//                         <TableHead>
//                             <TableHeadRow>
//                                 <TH>Competency</TH>
//                                 <TH>Description</TH>
//                                 <TH>Rating (1–5)</TH>
//                             </TableHeadRow>
//                         </TableHead>
//                         <TableBody>
//                             {competencies?.map((value: any, index: any) =>
//                                 <TableBodyRow key={index}>
//                                     <TD>{value.competency}</TD>
//                                     <TD>{value.description}</TD>
//                                     <TD>{value.rating}</TD>
//                                 </TableBodyRow>
//                             )}
//                         </TableBody>
//                     </Table>

//                     <Table>
//                         <Caption>Functional Competencies</Caption>
//                         <TableHead>
//                             <TableHeadRow>
//                                 <TH>KRA</TH>
//                                 <TH>Success Indicators</TH>
//                                 <TH>Rating (1–5)</TH>
//                             </TableHeadRow>
//                         </TableHead>
//                         <TableBody>
//                             {functionalCompetencies.length > 0
//                                 ? functionalCompetencies?.map((value: any, index: any) =>
//                                     <TableBodyRow key={index}>
//                                         <TD>{value.kra}</TD>
//                                         <TD>{value.indicators}</TD>
//                                         <TD>{value.rating}</TD>
//                                     </TableBodyRow>
//                                 ) : <TableBodyRow>
//                                     <TD col={3}><span className="flex items-center justify-center">No data</span></TD>
//                                 </TableBodyRow>
//                             }
//                         </TableBody>
//                     </Table>

//                     <Table>
//                         <Caption>Final Rating Summary</Caption>
//                         <TableHead>
//                             <TableHeadRow>
//                                 <TH>Compenent</TH>
//                                 <TH>Weight</TH>
//                                 <TH>Score (1–5)</TH>
//                             </TableHeadRow>
//                         </TableHead>
//                         <TableBody>
//                             {ratingSummary.length > 0
//                                 ? ratingSummary?.map((value: any, index: any) =>
//                                     <TableBodyRow key={index}>
//                                         <TD>{value.component}</TD>
//                                         <TD>{value.weight}</TD>
//                                         <TD>{value.score}</TD>
//                                     </TableBodyRow>
//                                 ) : <TableBodyRow>
//                                     <TD col={3}><span className="flex items-center justify-center">No data</span></TD>
//                                 </TableBodyRow>
//                             }
//                         </TableBody>
//                     </Table>

//                     <div className="flex flex-col gap-2 p-4 rounded-md bg-slate-50">
//                         <span className="font-semibold">Adjectival Rating:</span>
//                         <span className="font-semibold">Adjectival Rating Scale</span>
//                         <div className="flex flex-col w-[15rem]">
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm font-normal">Outstanding</span>
//                                 <span className="text-sm font-normal">4.50 – 5.00</span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm font-normal">Very Satisfactory</span>
//                                 <span className="text-sm font-normal">3.50 – 4.49</span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm font-normal">Satisfactory</span>
//                                 <span className="text-sm font-normal">2.50 – 3.49</span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm font-normal">Unsatisfactory</span>
//                                 <span className="text-sm font-normal">1.50 – 2.49</span>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <span className="text-sm font-normal">Poor</span>
//                                 <span className="text-sm font-normal">1.00 – 1.49</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </MainLayout>
//     )
// }