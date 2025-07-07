"use client";
import React, { useState } from "react";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send data to your backend
    setSuccess(true);
    setForm({
      name: "",
      phone: "",
      address: "",
      aadhar: "",
      doj: "",
      salary: "",
    });
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Employee
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter employee name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="aadhar"
            >
              Aadhar Number
            </label>
            <input
              id="aadhar"
              name="aadhar"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Aadhar number"
              value={form.aadhar}
              onChange={handleChange}
              required
              maxLength={12}
              pattern="\d{12}"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="doj"
            >
              Date of Joining
            </label>
            <input
              id="doj"
              name="doj"
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.doj}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              id="salary"
              name="salary"
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter salary"
              value={form.salary}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </form>
        {success && (
          <div className="mt-4 text-green-600 text-center font-medium">
            Employee added successfully!
          </div>
        )}
      </div>
    </main>
  );
}
