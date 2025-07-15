// "use client";
// import { useState } from "react";

// // Mock employee data
// const employees = [
//   { id: 1, name: "Alice Johnson" },
//   { id: 2, name: "Bob Smith" },
//   { id: 3, name: "Charlie Brown" },
// ];

// // Mock attendance records (replace with real fetch in production)
// const mockAttendanceRecords = [
//   {
//     date: "2025-07-01",
//     records: {
//       1: { status: "present" },
//       2: { status: "present" },
//       3: { status: "absent" },
//     },
//   },
//   {
//     date: "2025-07-02",
//     records: {
//       1: { status: "present" },
//       2: { status: "overtime", hours: "2" },
//       3: { status: "present" },
//     },
//   },
//   {
//     date: "2025-07-03",
//     records: {
//       1: { status: "absent" },
//       2: { status: "present" },
//       3: { status: "less_hours", hours: "3" },
//     },
//   },
//   // ...add more mock records for the month as needed
// ];

// // Helper to format date as yyyy-mm-dd
// function formatDate(date) {
//   return date.toISOString().split("T")[0];
// }

// // Helper to get all days in a month
// function getDaysInMonth(year, month) {
//   const days = [];
//   const date = new Date(year, month, 1);
//   while (date.getMonth() === month) {
//     days.push(new Date(date));
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
// }

// // Attendance cell color
// function getStatusColor(status) {
//   switch (status) {
//     case "present":
//       return "bg-green-100 text-green-800";
//     case "absent":
//       return "bg-red-100 text-red-800";
//     case "overtime":
//       return "bg-blue-100 text-blue-800";
//     case "less_hours":
//       return "bg-yellow-100 text-yellow-800";
//     default:
//       return "bg-gray-100 text-gray-500";
//   }
// }

// // Attendance cell label
// function getStatusLabel(record) {
//   if (!record) return "-";
//   if (record.status === "overtime" || record.status === "less_hours") {
//     return `${record.status.replace("_", " ")}${
//       record.hours ? ` (${record.hours}h)` : ""
//     }`;
//   }
//   return record.status;
// }

// export default function Dashboard() {
//   // Calendar state
//   const today = new Date();
//   const [month, setMonth] = useState(today.getMonth());
//   const [year, setYear] = useState(today.getFullYear());

//   // Days in selected month
//   const daysInMonth = getDaysInMonth(year, month);

//   // Attendance map for quick lookup: {date: {empId: record}}
//   const attendanceMap = {};
//   mockAttendanceRecords.forEach((rec) => {
//     attendanceMap[rec.date] = rec.records;
//   });

//   const handlePrevMonth = () => {
//     if (month === 0) {
//       setMonth(11);
//       setYear(year - 1);
//     } else {
//       setMonth(month - 1);
//     }
//   };

//   const handleNextMonth = () => {
//     if (month === 11) {
//       setMonth(0);
//       setYear(year + 1);
//     } else {
//       setMonth(month + 1);
//     }
//   };

//   return (
//     <main className="p-12 min-h-screen bg-gray-50">
//       <div className="max-w-full overflow-x-auto">
//         <div className="flex items-center justify-between mb-8">
//           <button
//             type="button"
//             className="px-6 py-2 rounded bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold text-2xl"
//             onClick={handlePrevMonth}
//           >
//             &lt;
//           </button>
//           <h2 className="text-4xl font-extrabold text-center flex-1">
//             Attendance -{" "}
//             {new Date(year, month).toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             })}
//           </h2>
//           <button
//             type="button"
//             className="px-6 py-2 rounded bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold text-2xl"
//             onClick={handleNextMonth}
//           >
//             &gt;
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-max border-2 border-gray-300 rounded-lg shadow bg-white text-lg">
//             <thead>
//               <tr>
//                 <th className="border-2 px-4 py-4 bg-gray-100 sticky left-0 z-10 text-xl">
//                   Employee
//                 </th>
//                 {daysInMonth.map((date, idx) => (
//                   <th
//                     key={idx}
//                     className="border-2 px-4 py-4 bg-gray-100 text-base"
//                   >
//                     {date.getDate()}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((emp) => (
//                 <tr key={emp.id}>
//                   <td className="border-2 px-4 py-4 font-bold bg-gray-50 sticky left-0 z-10 text-lg">
//                     {emp.name}
//                   </td>
//                   {daysInMonth.map((date, idx) => {
//                     const dateStr = formatDate(date);
//                     const record = attendanceMap[dateStr]?.[emp.id];
//                     return (
//                       <td
//                         key={idx}
//                         className={`border-2 px-4 py-4 text-center text-lg ${getStatusColor(
//                           record?.status
//                         )}`}
//                         title={getStatusLabel(record)}
//                       >
//                         {record
//                           ? record.status === "present"
//                             ? "✔️"
//                             : record.status === "absent"
//                             ? "❌"
//                             : record.status === "overtime"
//                             ? `OT${record.hours ? `(${record.hours})` : ""}`
//                             : record.status === "less_hours"
//                             ? `LH${record.hours ? `(${record.hours})` : ""}`
//                             : "-"
//                           : "-"}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="mt-8 flex gap-8 text-lg">
//           <span className="inline-flex items-center gap-2">
//             <span className="inline-block w-6 h-6 rounded bg-green-100 border border-green-300" />{" "}
//             Present
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <span className="inline-block w-6 h-6 rounded bg-red-100 border border-red-300" /> Absent
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <span className="inline-block w-6 h-6 rounded bg-blue-100 border border-blue-300" /> Overtime
//           </span>
//           <span className="inline-flex items-center gap-2">
//             <span className="inline-block w-6 h-6 rounded bg-yellow-100 border border-yellow-300" /> Less Hours
//           </span>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";
import { useEffect, useState } from "react";

// Helper to format date as yyyy-mm-dd
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Helper to get all days in a month
function getDaysInMonth(year, month) {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Attendance cell color
function getStatusColor(status) {
  switch (status) {
    case "present":
      return "bg-green-100 text-green-800";
    case "absent":
      return "bg-red-100 text-red-800";
    case "overtime":
      return "bg-blue-100 text-blue-800";
    case "undertime":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-500";
  }
}

// Attendance cell label
function getStatusLabel(record) {
  if (!record) return "-";
  if (record.status === "overtime" || record.status === "undertime") {
    return `${record.status.replace("_", " ")}${
      record.hours ? ` (${record.hours}h)` : ""
    }`;
  }
  return record.status;
}



export default function Dashboard() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const daysInMonth = getDaysInMonth(year, month);
  const startDate = formatDate(daysInMonth[0]);
  const endDate = formatDate(daysInMonth[daysInMonth.length - 1]);

  const attendanceMap = {};
  attendanceRecords.forEach((record) => {
    const date = record.date;
    if (!attendanceMap[date]) attendanceMap[date] = {};
    attendanceMap[date][String(record.emp_id)] = {
      status: record.attendance,
      hours: record.hours,
    };
  });

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/employee", {
        cache: "no-store",
      });
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
      setError("Failed to load employee data.");
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/attendance?emp_id=all&start=${startDate}&end=${endDate}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      console.log(data)
      setAttendanceRecords(data);
    } catch (err) {
      console.error("Failed to fetch attendance", err);
      setError("Failed to load attendance data.");
    }
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([fetchEmployees(), fetchAttendance()])
      .finally(() => setLoading(false));
  }, [month, year]);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  return (
    <main className="p-12 min-h-screen bg-gray-50">
      <div className="max-w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            className="px-6 py-2 rounded bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold text-2xl"
            onClick={handlePrevMonth}
          >
            &lt;
          </button>
          <h2 className="text-4xl font-extrabold text-center flex-1">
            Attendance -{" "}
            {new Date(year, month).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            type="button"
            className="px-6 py-2 rounded bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold text-2xl"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>

        {loading ? (
          <p className="text-xl text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-xl text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-max border-2 border-gray-300 rounded-lg shadow bg-white text-lg">
              <thead>
                <tr>
                  <th className="border-2 px-4 py-4 bg-gray-100 sticky left-0 z-10 text-xl">
                    Employee
                  </th>
                  {daysInMonth.map((date, idx) => (
                    <th
                      key={idx}
                      className="border-2 px-4 py-4 bg-gray-100 text-base"
                    >
                      {date.getDate()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="border-2 px-4 py-4 font-bold bg-gray-50 sticky left-0 z-10 text-lg">
                      {emp.name}
                    </td>
                    {daysInMonth.map((date, idx) => {
                      const dateStr = formatDate(date);
                      const record = attendanceMap[dateStr]?.[emp.id];
                      return (
                        <td
                          key={idx}
                          className={`border-2 px-4 py-4 text-center text-lg ${getStatusColor(
                            record?.status
                          )}`}
                          title={getStatusLabel(record)}
                        >
                          {record
                            ? record.status === "present"
                              ? "P"
                              : record.status === "absent"
                              ? "A"
                              : record.status === "overtime"
                              ? `O${record.hours ? `(${parseInt(record.hours)-8})` : ""}`
                              : record.status === "undertime"
                              ? `U${record.hours ? `(${parseInt(record.hours)})` : ""}`
                              : "-"
                            : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 flex gap-8 text-lg">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-6 h-6 rounded bg-green-100 border border-green-300" />{" "}
            Present
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-6 h-6 rounded bg-red-100 border border-red-300" />{" "}
            Absent
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-6 h-6 rounded bg-blue-100 border border-blue-300" />{" "}
            Overtime
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-6 h-6 rounded bg-yellow-100 border border-yellow-300" />{" "}
            Less Hours
          </span>
        </div>
      </div>
    </main>
  );
}

