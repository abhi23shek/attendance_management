"use client";
import { useState } from "react";

// Mock data
const employees = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    attendance: [
      { date: "2025-07-01", status: "Present" },
      { date: "2025-07-02", status: "Absent" },
      { date: "2025-07-03", status: "Present" },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    attendance: [
      { date: "2025-07-01", status: "Present" },
      { date: "2025-07-02", status: "Present" },
      { date: "2025-07-03", status: "Present" },
    ],
  },
];

function getCurrentMonthAttendance(attendance) {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  return attendance.filter((a) => {
    const d = new Date(a.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });
}

export default function Dashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <main className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Employee Attendance -{" "}
        {new Date().toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
        {/* Employee List */}
        <div className="md:w-1/3">
          <h3 className="font-semibold mb-3 text-lg">Employee List</h3>
          <ul className="bg-white border rounded-lg shadow divide-y">
            {employees.map((emp) => (
              <li
                key={emp.id}
                className={`p-4 cursor-pointer hover:bg-blue-50 transition ${
                  selectedEmployee?.id === emp.id ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelectedEmployee(emp)}
              >
                <div className="font-medium">{emp.name}</div>
                <div className="text-xs text-gray-500">{emp.email}</div>
              </li>
            ))}
          </ul>
        </div>
        {/* Attendance Table */}
        <div className="flex-1">
          {selectedEmployee ? (
            <div>
              <h3 className="font-semibold mb-3 text-lg">
                {selectedEmployee.name}&apos;s Attendance
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg shadow">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2 bg-gray-100 text-left">
                        Date
                      </th>
                      <th className="border px-4 py-2 bg-gray-100 text-left">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentMonthAttendance(selectedEmployee.attendance).map(
                      (att, idx) => (
                        <tr key={idx}>
                          <td className="border px-4 py-2">{att.date}</td>
                          <td
                            className={`border px-4 py-2 font-semibold ${
                              att.status === "Present"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {att.status}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 mt-10 text-center">
              Select an employee to view attendance.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
