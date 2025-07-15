"use client";
import React, { useEffect, useState } from "react";

export default function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    aadhar: "",
    doj: "",
    salary: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/employee");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone_number: form.phone,
          address: form.address,
          date_of_joining: form.doj,
          salary: form.salary,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setForm({
          name: "",
          phone: "",
          address: "",
          aadhar: "",
          doj: "",
          salary: "",
        });
        fetchEmployees();
      } else {
        const resBody = await response.json();
        setError(resBody?.error || "Failed to add employee");
      }
    } catch (err) {
      setError(err.message || "Unexpected error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <main className="p-10 min-h-screen bg-gray-50">
      {/* Add Employee Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Employee</h2>
        <form className="flex flex-wrap gap-4 items-end justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Phone</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Address</label>
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Aadhar</label>
            <input
              name="aadhar"
              type="text"
              value={form.aadhar}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
              maxLength={12}
              pattern="\d{12}"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">DOJ</label>
            <input
              name="doj"
              type="date"
              value={form.doj}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Salary</label>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>
        {success && (
          <p className="mt-4 text-green-600 text-center font-medium">
            Employee added successfully!
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-center font-medium">
            Error: {error}
          </p>
        )}
      </div>

      {/* Employee List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Employee List</h3>
        {employees.length === 0 ? (
          <p className="text-gray-500">No employees found.</p>
        ) : (
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Address</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{emp.id}</td>
                  <td className="py-2 px-4 border-b">{emp.name}</td>
                  <td className="py-2 px-4 border-b">{emp.phone_number}</td>
                  <td className="py-2 px-4 border-b">{emp.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
