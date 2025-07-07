import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>
      <Link href="/dashboard" className="text-blue-600 underline">
        Go to Dashboard
      </Link>
      <Link href="/addemp" className="text-blue-600 underline">
        Add Employee
      </Link>
      <Link href="/addatt" className="text-blue-600 underline">
        Add Attendance
      </Link>
    </main>
  );
}