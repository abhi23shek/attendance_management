// "use client";
// import { useState } from "react";

// // Mock employee data (replace with real data/fetch in production)
// const employees = [
//   { id: 1, name: "Alice Johnson" },
//   { id: 2, name: "Bob Smith" },
//   { id: 3, name: "Charlie Brown" },
// ];

// // Mock attendance records (replace with real fetch in production)
// const mockAttendanceRecords = [
//   {
//     date: "2025-07-07",
//     records: {
//       1: { status: "present", hours: "" },
//       2: { status: "overtime", hours: "2" },
//       3: { status: "absent", hours: "" },
//     },
//   },
//   {
//     date: "2025-07-06",
//     records: {
//       1: { status: "less_hours", hours: "3" },
//       2: { status: "present", hours: "" },
//       3: { status: "present", hours: "" },
//     },
//   },
// ];

// const statusOptions = [
//   { value: "present", label: "Present" },
//   { value: "absent", label: "Absent" },
//   { value: "overtime", label: "Overtime" },
//   { value: "less_hours", label: "Less Hours" },
// ];

// // Mock password for editing
// const EDIT_PASSWORD = "admin123";

// // Helper to format date as yyyy-mm-dd
// function formatDate(date) {
//   return date.toISOString().split("T")[0];
// }

// // Custom Calendar with month navigation
// function Calendar({ selectedDate, onSelect, recordedDates, month, setMonth, year, setYear }) {
//   // First day of the month
//   const firstDay = new Date(year, month, 1);
//   // Last day of the month
//   const lastDay = new Date(year, month + 1, 0);

//   // Days to show before the 1st (to align the calendar)
//   const startDay = firstDay.getDay(); // 0 (Sun) - 6 (Sat)
//   const daysInMonth = lastDay.getDate();

//   // Build calendar grid
//   const days = [];
//   for (let i = 0; i < startDay; i++) {
//     days.push(null);
//   }
//   for (let d = 1; d <= daysInMonth; d++) {
//     days.push(new Date(year, month, d));
//   }
//   while (days.length % 7 !== 0) {
//     days.push(null);
//   }

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
//     <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs">
//       <div className="flex justify-between items-center mb-2">
//         <button
//           type="button"
//           className="px-2 py-1 rounded hover:bg-blue-100"
//           onClick={handlePrevMonth}
//         >
//           &lt;
//         </button>
//         <span className="font-semibold">
//           {firstDay.toLocaleString("default", { month: "long", year: "numeric" })}
//         </span>
//         <button
//           type="button"
//           className="px-2 py-1 rounded hover:bg-blue-100"
//           onClick={handleNextMonth}
//         >
//           &gt;
//         </button>
//       </div>
//       <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
//         <span className="font-semibold">Sun</span>
//         <span className="font-semibold">Mon</span>
//         <span className="font-semibold">Tue</span>
//         <span className="font-semibold">Wed</span>
//         <span className="font-semibold">Thu</span>
//         <span className="font-semibold">Fri</span>
//         <span className="font-semibold">Sat</span>
//       </div>
//       <div className="grid grid-cols-7 gap-1">
//         {days.map((dateObj, idx) => {
//           if (!dateObj) return <span key={idx} />;
//           const dateStr = formatDate(dateObj);
//           const isRecorded = recordedDates.includes(dateStr);
//           const isSelected = selectedDate === dateStr;
//           return (
//             <button
//               key={idx}
//               type="button"
//               className={`rounded-full w-8 h-8 flex items-center justify-center transition
//                 ${isRecorded ? "bg-green-200 text-green-900 font-bold" : ""}
//                 ${isSelected ? "ring-2 ring-blue-500" : ""}
//                 hover:bg-blue-100`}
//               onClick={() => onSelect(dateStr)}
//             >
//               {dateObj.getDate()}
//             </button>
//           );
//         })}
//       </div>
//       <div className="text-xs mt-2 flex items-center gap-2">
//         <span className="inline-block w-3 h-3 rounded-full bg-green-200 border border-green-400" />
//         <span>Attendance recorded</span>
//       </div>
//     </div>
//   );
// }

// export default function AddAttendance() {
//   // Calendar state
//   const today = new Date();
//   const [month, setMonth] = useState(today.getMonth());
//   const [year, setYear] = useState(today.getFullYear());

//   // Dates with attendance already recorded
//   const recordedDates = mockAttendanceRecords.map((rec) => rec.date);

//   // Default selected date is today
//   const [date, setDate] = useState(formatDate(today));

//   // Find if attendance already exists for the selected date
//   const existingRecord = mockAttendanceRecords.find((rec) => rec.date === date);

//   const [attendance, setAttendance] = useState(
//     employees.reduce((acc, emp) => {
//       acc[emp.id] = { status: "present", hours: "" };
//       return acc;
//     }, {})
//   );
//   const [success, setSuccess] = useState(false);

//   // Edit mode and password state
//   const [editMode, setEditMode] = useState(false);
//   const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   // When switching to edit mode, prefill attendance with existing data
//   const handleEdit = () => {
//     setShowPasswordPrompt(true);
//     setPassword("");
//     setPasswordError("");
//   };

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     if (password === EDIT_PASSWORD) {
//       setEditMode(true);
//       setShowPasswordPrompt(false);
//       // Prefill attendance with existing record
//       setAttendance({ ...existingRecord.records });
//     } else {
//       setPasswordError("Incorrect password. Please try again.");
//     }
//   };

//   const handleStatusChange = (empId, status) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [empId]: { status, hours: (status === "overtime" || status === "less_hours") ? prev[empId].hours : "" },
//     }));
//   };

//   const handleHoursChange = (empId, hours) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [empId]: { ...prev[empId], hours },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would send {date, attendance} to your backend
//     setSuccess(true);
//     setEditMode(false);
//     setTimeout(() => setSuccess(false), 2000);
//   };

//   // Custom style for light green background for the whole page if attendance is recorded
//   const lightGreen = recordedDates.includes(date) ? "bg-green-50" : "bg-gray-50";

//   return (
//     <main className={`flex flex-col items-center justify-center min-h-screen ${lightGreen}`}>
//       <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
//         {/* Calendar on the left */}
//         <div className="md:w-1/3 flex justify-center">
//           <Calendar
//             selectedDate={date}
//             onSelect={(d) => {
//               setEditMode(false);
//               setDate(d);
//             }}
//             recordedDates={recordedDates}
//             month={month}
//             setMonth={setMonth}
//             year={year}
//             setYear={setYear}
//           />
//         </div>
//         {/* Attendance form on the right */}
//         <div className="md:w-2/3">
//           <div className="bg-white p-8 rounded-lg shadow-md w-full">
//             <h2 className="text-2xl font-bold mb-6 text-center">Add Attendance</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//               {existingRecord && !editMode ? (
//                 <div className="mb-4">
//                   <h3 className="font-semibold mb-2 text-green-700">Attendance already saved for {date}:</h3>
//                   <table className="min-w-full bg-white border rounded-lg shadow">
//                     <thead>
//                       <tr>
//                         <th className="border px-4 py-2 bg-gray-100 text-left">Employee</th>
//                         <th className="border px-4 py-2 bg-gray-100 text-left">Status</th>
//                         <th className="border px-4 py-2 bg-gray-100 text-left">Hours</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {employees.map((emp) => (
//                         <tr key={emp.id}>
//                           <td className="border px-4 py-2">{emp.name}</td>
//                           <td className="border px-4 py-2 capitalize">
//                             {existingRecord.records[emp.id]?.status || "-"}
//                           </td>
//                           <td className="border px-4 py-2">
//                             {existingRecord.records[emp.id]?.hours || "-"}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <div className="mt-4 flex flex-col items-center gap-2">
//                     <span className="text-blue-600 text-center">
//                       Attendance for this date has already been recorded.
//                     </span>
//                     <button
//                       type="button"
//                       className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition"
//                       onClick={handleEdit}
//                     >
//                       Edit Attendance
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div>
//                     <h3 className="font-semibold mb-2">{editMode ? "Edit Attendance" : "Mark Attendance"}</h3>
//                     <table className="min-w-full bg-white border rounded-lg shadow">
//                       <thead>
//                         <tr>
//                           <th className="border px-4 py-2 bg-gray-100 text-left">Employee</th>
//                           <th className="border px-4 py-2 bg-gray-100 text-left">Status</th>
//                           <th className="border px-4 py-2 bg-gray-100 text-left">Hours</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {employees.map((emp) => (
//                           <tr key={emp.id}>
//                             <td className="border px-4 py-2">{emp.name}</td>
//                             <td className="border px-4 py-2">
//                               <select
//                                 className="border rounded px-2 py-1"
//                                 value={attendance[emp.id]?.status || "present"}
//                                 onChange={(e) => handleStatusChange(emp.id, e.target.value)}
//                               >
//                                 {statusOptions.map((opt) => (
//                                   <option key={opt.value} value={opt.value}>
//                                     {opt.label}
//                                   </option>
//                                 ))}
//                               </select>
//                             </td>
//                             <td className="border px-4 py-2">
//                               {(attendance[emp.id]?.status === "overtime" ||
//                                 attendance[emp.id]?.status === "less_hours") && (
//                                 <input
//                                   type="number"
//                                   min="1"
//                                   className="border rounded px-2 py-1 w-24"
//                                   placeholder="Hours"
//                                   value={attendance[emp.id]?.hours || ""}
//                                   onChange={(e) => handleHoursChange(emp.id, e.target.value)}
//                                   required
//                                 />
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                   <button
//                     type="submit"
//                     className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
//                   >
//                     {editMode ? "Update Attendance" : "Submit Attendance"}
//                   </button>
//                 </>
//               )}
//             </form>
//             {success && (
//               <div className="mt-4 text-green-600 text-center font-medium">
//                 Attendance {editMode ? "updated" : "submitted"} successfully!
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* Password Prompt Modal - OUTSIDE the main form */}
//       {showPasswordPrompt && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
//           <div className="bg-white p-6 rounded shadow-lg w-full max-w-xs">
//             <h4 className="font-bold mb-2 text-center">Enter Password to Edit</h4>
//             <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
//               <input
//                 type="password"
//                 className="border rounded px-3 py-2"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoFocus
//               />
//               {passwordError && (
//                 <div className="text-red-600 text-sm">{passwordError}</div>
//               )}
//               <div className="flex gap-2 justify-center">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
//                 >
//                   Submit
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
//                   onClick={() => setShowPasswordPrompt(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";
import { useEffect, useState } from "react";

const statusOptions = [
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "overtime", label: "Overtime" },
  { value: "less_hours", label: "Less Hours" },
  { value: "not_marked", label: "Not marked"}
];

const EDIT_PASSWORD = "admin123";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function Calendar({ selectedDate, onSelect, recordedDates, month, setMonth, year, setYear }) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
  while (days.length % 7 !== 0) days.push(null);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => {
          if (month === 0) {
            setMonth(11); setYear(year - 1);
          } else setMonth(month - 1);
        }}>&lt;</button>
        <span className="font-semibold">
          {firstDay.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button onClick={() => {
          if (month === 11) {
            setMonth(0); setYear(year + 1);
          } else setMonth(month + 1);
        }}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-center">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => <div key={day} className="font-bold">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-1">
        {days.map((dateObj, idx) => {
          if (!dateObj) return <span key={idx}></span>;
          const dateStr = formatDate(dateObj);
          const isRecorded = recordedDates.includes(dateStr);
          const isSelected = selectedDate === dateStr;
          return (
            <button
              key={idx}
              onClick={() => onSelect(dateStr)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${isRecorded ? "bg-green-200 text-green-800 font-bold" : ""}
                ${isSelected ? "ring-2 ring-blue-500" : ""}
                hover:bg-blue-100`}
            >
              {dateObj.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AddAttendance() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [date, setDate] = useState(formatDate(today));

  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const recordedDates = attendanceRecords.map((rec) => rec.date);
  const existingRecord = attendanceRecords.find((rec) => rec.date === date);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const empRes = await fetch("/api/employee");
        const empData = await empRes.json();
        setEmployees(empData);

        const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
        const end = `${year}-${String(month + 1).padStart(2, "0")}-${new Date(year, month + 1, 0).getDate()}`;
        const attRes = await fetch(`/api/attendance?emp_id=all&start=${start}&end=${end}`);
        const attData = await attRes.json();

        const grouped = attData.reduce((acc, { date, emp_id, attendance, hours }) => {
          if (!acc[date]) acc[date] = {};
          acc[date][emp_id] = { status: attendance, hours };
          return acc;
        }, {});

        const structured = Object.entries(grouped).map(([date, records]) => ({ date, records }));
        setAttendanceRecords(structured);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  // useEffect(() => {
  //   setAttendance(
  //     employees.reduce((acc, emp) => {
  //       acc[emp.id] = { status: "not_marked", hours: "" };
  //       return acc;
  //     }, {})
  //   );
  // }, [employees]);

  useEffect(() => {
  if (existingRecord) {
    // If attendance already exists for the selected date
    setAttendance({ ...existingRecord.records });
  } else {
    // Else initialize all to "not_marked"
    setAttendance(
      employees.reduce((acc, emp) => {
        acc[emp.id] = { status: "not_marked", hours: "" };
        return acc;
      }, {})
    );
  }
}, [employees, existingRecord]);


  const handleEdit = () => {
    setShowPasswordPrompt(true);
    setPassword("");
    setPasswordError("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === EDIT_PASSWORD) {
      setEditMode(true);
      setShowPasswordPrompt(false);
      setAttendance({ ...existingRecord.records });
    } else {
      setPasswordError("Incorrect password.");
    }
  };

  const handleStatusChange = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: { status, hours: status === "overtime" || status === "less_hours" ? prev[id].hours : "" },
    }));
  };

  const handleHoursChange = (id, hours) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: { ...prev[id], hours },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, records: attendance }),
      });
      if (response.ok) {
        setSuccess(true);
        setEditMode(false);
        const updated = [...attendanceRecords.filter(r => r.date !== date), { date, records: attendance }];
        setAttendanceRecords(updated);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const bgColor = recordedDates.includes(date) ? "bg-green-50" : "bg-gray-50";

  return (
    <main className={`flex flex-col items-center min-h-screen p-4 ${bgColor}`}>
      {loading ? (
        <p className="text-xl text-gray-600 mt-20">Loading...</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
          <div className="md:w-1/3">
            <Calendar
              selectedDate={date}
              onSelect={(d) => {
                setEditMode(false);
                setDate(d);
              }}
              recordedDates={recordedDates}
              month={month}
              setMonth={setMonth}
              year={year}
              setYear={setYear}
            />
          </div>
          <div className="md:w-2/3 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold text-center mb-4">{editMode ? "Edit Attendance" : "Mark Attendance"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td className="p-2">{emp.name}</td>
                      <td className="p-2">
                        <select
                          value={attendance[emp.id]?.status || "not_marked"}
                          onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                          className="border px-2 py-1 rounded"
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2">
                        {(attendance[emp.id]?.status === "overtime" || attendance[emp.id]?.status === "less_hours") && (
                          <input
                            type="number"
                            value={attendance[emp.id]?.hours || ""}
                            onChange={(e) => handleHoursChange(emp.id, e.target.value)}
                            className="border px-2 py-1 rounded w-20"
                            min="1"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {existingRecord && !editMode && (
                <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleEdit}>
                  Edit Attendance
                </button>
              )}
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                {editMode ? "Update" : "Submit"} Attendance
              </button>
              {success && <p className="text-green-600 text-center font-medium">Attendance saved successfully!</p>}
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Enter Password to Edit</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Password"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
                <button onClick={() => setShowPasswordPrompt(false)} type="button" className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
