'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>
      <h1>{JSON.stringify(data[0])}</h1>

      <Link href="/dashboard" className="text-blue-600 underline">Go to Dashboard</Link>
      <Link href="/addemp" className="text-blue-600 underline">Add Employee</Link>
      <Link href="/addatt" className="text-blue-600 underline">Add Attendance</Link>
    </main>
  );
}
