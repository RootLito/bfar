import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import axios from "axios";
import { MdPrint, MdFileOpen } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const Reports = () => {
  const currentDate = new Date();
  const date = format(currentDate, "MM/dd/yyyy");
  const [totalRes, setTotalRes] = useState(0);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const tableRef = useRef();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get(
          "https://bfar-server.onrender.com/survey"
        );
        setSurveys(response.data);
        setTotalRes(response.data.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) {
    return (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success text-white text-center">
          <span className="loading loading-spinner loading-sm"></span>
          <span>Fetching data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="toast toast-top toast-center z-2">
        <div className="alert alert-error text-white text-center">
          <span>Error fetching data</span>
        </div>
      </div>
    );
  }

  const exportToExcel = async (surveys) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Survey Data");

    // Row 1: Top headers
    worksheet.getRow(1).values = [
      "No.",
      "Personal Information",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Location",
      "",
      "",
      "Project Received",
      "Specific Project",
      "No. of Units Received",
      "Efficiency of the Project",
      "",
      "",
      "Relevance of the Project",
      "",
      "Coherence of the Project",
      "",
      "Effectiveness of the Project",
      "",
      "Impact of the Project",
      "",
      "",
      "",
      "",
      "",
      "",
      "Sustainability of the Project",
      "",
      "Needs Assessment",
      "Evaluator's Note",
      "Evaluator",
    ];

    // Merge headers
    worksheet.mergeCells("A1:A2"); // No.
    worksheet.mergeCells("B1:M1"); // Personal Information
    worksheet.mergeCells("N1:P1"); // Location
    worksheet.mergeCells("Q1:Q2"); // Project Received
    worksheet.mergeCells("R1:R2"); 
    worksheet.mergeCells("S1:S2"); 

    worksheet.mergeCells("T1:V1"); // Efficiency
    worksheet.mergeCells("W1:X1"); // Relevance
    worksheet.mergeCells("Y1:Z1"); // Coherence
    worksheet.mergeCells("AA1:AB1"); // Effectiveness
    worksheet.mergeCells("AC1:AH1"); // Impact
    worksheet.mergeCells("AI1:AJ1"); // Sustainability
    worksheet.mergeCells("AK1:AK2"); // Needs Assessment
    worksheet.mergeCells("AL1:AL2"); // Evaluator's Note
    worksheet.mergeCells("AM1:AM2"); // Evaluator

    // Row 2: Subheaders
    worksheet.getRow(2).values = [
      "",
      "Respondent Type",
      "Name",
      "Civil Status",
      "Sex",
      "Age",
      "No. of Household Members",
      "FishR",
      "BoatR",
      "Name of Association",
      "Total No. of Members",
      "Main Source of Income",
      "Other Source of Income",
      "Province",
      "City/Municipality",
      "Barangay",
      "",
      "",
      "",
      "Remarks on Sufficiency",
      "Remarks on Quality",
      "Remarks on Timeliness",

      "Remarks on Relevance",
      "Remarks on Sustainability",

      "Remarks on Coherence",
      "Remarks on Project Duplication",

      "Remarks on Satisfaction",
      "Problems Encountered",

      "Catch/Yield in Kgs",
      "Contribution to Production",
      "Species Caught",
      "Income in Php",
      "Improvement in Family",
      "Improvement in Association",
      "Improvement in Community",

      "Remarks on Sustainability",
      "Availability of Market",
      "",
      "",
      "",
    ];

    // Populate data rows
    surveys.forEach((survey, index) => {
      worksheet.addRow([
        index + 1,
        survey.resType,
        survey.name,
        survey.civilStatus,
        survey.sex,
        survey.age,
        survey.hhMember,
        survey.fishR,
        survey.boatR,
        survey.nameAssoc,
        survey.totalMember,
        survey.mainIncome, 
        survey.otherIncome,
        survey.province,
        survey.municipality,
        survey.baranggay,
        survey.projectReceived,
        survey.specProject,
        survey.noUnitsReceived,
        survey.quantity,
        survey.quality,
        survey.uponRequest + " " + survey.duration,
        survey.q3,
        survey.q4,
        survey.q5,
        survey.q6 === "Yes" ? survey.q6Reason : survey.q6,
        survey.q7Satisfied,
        survey.q8 === "none" ? survey.q8 : survey.q8Reason,
        survey.q9_3,
        survey.q9_4,
        survey.q9_1 !== "N/A" ? survey.q9_1Spec : survey.q9_1,
        "", // q9_9 not included
        survey.q9_10 === "yes" ? survey.q9_11?.join(", ") : survey.q9_10,
        survey.q9_12 === "yes"
          ? survey.q9_13 === "others"
            ? survey.q9_13other
            : survey.q9_13
          : survey.q9_12,
        survey.q9_14 === "yes" ? survey.q9_12Spec : survey.q9_14,
        survey.q10 === "No" ? survey.q10Reason : survey.q10,
        survey.q11 === "yes" ? survey.q11_1 : survey.q11,
        survey.q12,
        survey.note,
        survey.evaluator,
      ]);
    });

    // Format headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(2).font = { bold: true };
    worksheet.columns.forEach((col) => {
      col.width = 20;
      col.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });

    // Export file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, "survey_data.xlsx");
  };

  return (
    <div className="flex-1 p-10 flex flex-col gap-10 overflow-xp-auto">
      <div className="p-10 h-full bg-white rounded-box shadow-sm overflow-x-auto">
        {/* <h2 className="text-center font-black text-lg text-gray-600">
          TOTAL NO. OF RESPONDENTS AS OF {date}
        </h2>
        <div className="text-center">
          <div className="inline-block rounded-xl bg-blue-950 mb-10 font-bold text-white text-center text-5xl p-2">
            {totalRes}
          </div>
        </div> */}

        <div className="flex justify-between mb-8 items-end">
          <div className="felx flex-col">
            <h2 className="card-title text-blue-950 font-black">
              Field Monitoring and Evaluation Summary
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-success w-32 text-green-50"
              onClick={() => exportToExcel(surveys)}
            >
              <MdFileOpen /> Export
            </button>
            {/* <button className="btn btn-error w-32 text-blue-50" onClick={() => reactToPrintFn()}>
              <MdPrint /> Print
            </button> */}
          </div>
        </div>

        <div
          ref={contentRef}
          className="h-120 overflow-x-auto  border border-base-content/5 bg-base-100 text-xs"
        >
          <table
            ref={tableRef}
            className="table table-zebra text-sm bg-blue-950"
          >
            <thead className="sticky top-0 bg-blue-950">
              <tr className="bg-blue-950 text-white">
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  No.
                </th>

                <th className="py-2 whitespace-nowrap text-center" colSpan="12">
                  Personal Information
                </th>

                <th className="py-2 whitespace-nowrap text-center" colSpan="3">
                  Location
                </th>
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  Project Received
                </th>
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  Specific Project
                </th>
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  No. of Units Received
                </th>
                <th className="py-2 whitespace-nowrap" rowSpan="2">
                  Date Received/Implemented
                </th>

                <th className="py-2 whitespace-nowrap text-center" colSpan="3">
                  Efficiency of the Project
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="2">
                  Relevance of the Project
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="2">
                  Coherence of the Project
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="2">
                  Effectiveness of the Project
                </th>
                <th className="py-2 whitespace-nowrap text-center" colSpan="7">
                  Impact of the Project
                </th>

                <th className="py-2 whitespace-nowrap text-center" colSpan="4">
                  Sustainability of the Project
                </th>

                <th className="py-2 whitespace-nowrap text-center" rowSpan={2}>
                  Needs Assessment
                </th>

                <th className="py-2 whitespace-nowrap text-center" rowSpan={2}>
                  Evaluator's Note
                </th>
                <th className="py-2 whitespace-nowrap text-center" rowSpan={2}>
                  Evaluator
                </th>
              </tr>

              <tr className="bg-blue-900 text-white ">
                <th className="py-2 whitespace-nowrap">Respondent Type</th>
                <th className="py-2 whitespace-nowrap">Name</th>
                <th className="py-2 whitespace-nowrap">Civil Status</th>
                <th className="py-2 whitespace-nowrap">Sex</th>
                <th className="py-2 whitespace-nowrap">Age</th>
                <th className="py-2 whitespace-nowrap">
                  No. of Household Members
                </th>
                <th className="py-2 whitespace-nowrap">FishR</th>
                <th className="py-2 whitespace-nowrap">BoatR</th>
                <th className="py-2 whitespace-nowrap">Name of Association</th>
                <th className="py-2 whitespace-nowrap">
                  Total No. of Memebers
                </th>
                <th className="py-2 whitespace-nowrap">
                  Main Source of Income
                </th>
                <th className="py-2 whitespace-nowrap">
                  Other Source of Income
                </th>

                <th className="py-2 whitespace-nowrap">Province</th>
                <th className="py-2 whitespace-nowrap">City/Municipality</th>
                <th className="py-2 whitespace-nowrap">Barangay</th>

                <th className="py-2 whitespace-nowrap">
                  Remarks on Sufficiency
                </th>
                <th className="py-2 whitespace-nowrap">Remarks on Quality</th>
                <th className="py-2 whitespace-nowrap">
                  Remarks on Timeliness
                </th>

                <th className="py-2 whitespace-nowrap">Remarks on Relevance</th>
                <th className="py-2 whitespace-nowrap">
                  Remarks on Sustainability
                </th>

                <th className="py-2 whitespace-nowrap">Remarks on Coherance</th>
                <th className="py-2 whitespace-nowrap">
                  Remarks on Project Duplication
                </th>

                <th className="py-2 whitespace-nowrap">
                  Remarks on Satisfaction
                </th>
                <th className="py-2 whitespace-nowrap">Problems Encountered</th>

                <th className="py-2 whitespace-nowrap">Catch/Yield Before</th>
                <th className="py-2 whitespace-nowrap">Catch/Yield After</th>

                <th className="py-2 whitespace-nowrap">
                  Remarks on Contribution to Production
                </th>
                <th className="py-2 whitespace-nowrap">
                  Species Caught (Capture Only)
                </th>

                <th className="py-2 whitespace-nowrap">Income Before</th>
                <th className="py-2 whitespace-nowrap">Income After</th>
                <th className="py-2 whitespace-nowrap">
                  Improvement in Family/Household
                </th>

                <th className="py-2 whitespace-nowrap">
                  Improvement in Association
                </th>
                <th className="py-2 whitespace-nowrap">
                  Improvement in Community
                </th>

                <th className="py-2 whitespace-nowrap">
                  Remarks on Sustainability
                </th>
                <th className="py-2 whitespace-nowrap">
                  Availability of Market
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {surveys.slice().reverse().map((survey, index) => (
                <tr key={index} className="py-0">
                  <th className="py-2 whitespace-nowrap">{index + 1}</th>

                  <td className="py-2 whitespace-nowrap">{survey.resType}</td>
                  <td className="py-2 whitespace-nowrap">{survey.name}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.civilStatus}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.sex}</td>
                  <td className="py-2 whitespace-nowrap">{survey.age}</td>
                  <td className="py-2 whitespace-nowrap">{survey.hhMember}</td>
                  <td className="py-2 whitespace-nowrap">{survey.fishR}</td>
                  <td className="py-2 whitespace-nowrap">{survey.boatR}</td>
                  <td className="py-2 whitespace-nowrap">{survey.nameAssoc}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.totalMember}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.mainIncome}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.otherIncome}
                  </td>

                  <td className="py-2 whitespace-nowrap">{survey.province}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.municipality}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.baranggay}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.projectReceived}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.specProject}
                  </td>

                  <td className="py-2 whitespace-nowrap">
                    {survey.noUnitsReceived}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.dateReceived
                      ? format(new Date(survey.dateReceived), "dd/MM/yyyy")
                      : "N/A"}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.quantity}</td>
                  <td className="py-2 whitespace-nowrap">{survey.quality}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.uponRequest} {survey.duration}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.q3}</td>
                  <td className="py-2 whitespace-nowrap">{survey.q4}</td>
                  <td className="py-2 whitespace-nowrap">{survey.q5}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q6 === "Yes" ? survey.q6Reason : survey.q6}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q7Satisfied}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q8 === "none" ? survey.q8 : survey.q8Reason}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.q9_2}</td>
                  <td className="py-2 whitespace-nowrap">{survey.q9_3}</td>
                  <td className="py-2 whitespace-nowrap">{survey.q9_4}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q9_1 !== "N/A" ? survey.q9_1Spec : survey.q9_1}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.q9_8}</td>
                  <td className="py-2 whitespace-nowrap">{survey.q9_9}</td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q9_11?.join(", ") || "—"}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q9_12 === "yes"
                      ? survey.q9_13 === "others"
                        ? survey.q9_13other
                        : survey.q9_13
                      : survey.q9_12}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q9_14 == "yes" ? survey.q9_12Spec : survey.q9_14}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q10 === "No" ? survey.q10Reason : survey.q10}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {survey.q11 == "yes" ? survey.q11_1 : survey.q11}
                  </td>
                  <td className="py-2 whitespace-nowrap">{survey.q12}</td>
                  <td className="py-2 whitespace-nowrap">{survey.note}</td>
                  <td className="py-2 whitespace-nowrap">{survey.evaluator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
