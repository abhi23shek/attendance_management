import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// GET attendance by emp_id and date range: ?emp_id=1&start=2025-07-01&end=2025-07-15
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const emp_id = searchParams.get("emp_id");
//   const start = searchParams.get("start");
//   const end = searchParams.get("end");

  

//   if (!emp_id || !start || !end) {
//     return Response.json({ error: "emp_id, start, and end are required" }, { status: 400 });
//   }

//   try {

//     if(emp_id == "all"){
//         const result = await sql`
//   SELECT id, emp_id, date::date AS date, attendance, hours
//   FROM attendance WHERE
//   date::date BETWEEN ${start}::date AND ${end}::date
//   ORDER BY date
// `;
//     }else{
//     const result = await sql`
//   SELECT id, emp_id, date::date AS date, attendance, hours
//   FROM attendance
//   WHERE emp_id = ${emp_id}
//   AND date::date BETWEEN ${start}::date AND ${end}::date
//   ORDER BY date
// `;
// }
// // Map results to format date string only
// const formattedResult = result.map(row => ({
//   ...row,
//   date: row.date.toISOString().slice(0, 10)  // 'YYYY-MM-DD'
// }));
//     return Response.json(formattedResult);
//   } catch (error) {
//     console.error("Error fetching attendance:", error);
//     return Response.json({ error: "Failed to fetch attendance" }, { status: 500 });
//   }
// }

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const emp_id = searchParams.get("emp_id");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!emp_id || !start || !end) {
    return Response.json(
      { error: "emp_id, start, and end are required" },
      { status: 400 }
    );
  }

  try {
    let result;

    if (emp_id === "all") {
      result = await sql`
        SELECT id, emp_id, date::date AS date, attendance, hours
        FROM attendance
        WHERE date::date BETWEEN ${start}::date AND ${end}::date
        ORDER BY date
      `;
    } else {
      result = await sql`
        SELECT id, emp_id, date::date AS date, attendance, hours
        FROM attendance
        WHERE emp_id = ${emp_id}
        AND date::date BETWEEN ${start}::date AND ${end}::date
        ORDER BY date
      `;
    }

    // Format the date
    const formattedResult = result.map((row) => ({
      ...row,
      date: row.date.toISOString().slice(0, 10), // 'YYYY-MM-DD'
    }));

    return Response.json(formattedResult);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return Response.json(
      { error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}


// POST new attendance record
export async function POST(request) {
  const { emp_id, date, attendance, hours } = await request.json();

  if (!emp_id || !date || !attendance) {
    return Response.json({ error: "emp_id, date, and attendance are required" }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO attendance (emp_id, date, attendance, hours)
      VALUES (${emp_id}, ${date}, ${attendance}, ${hours || 0})
    `;
    return Response.json({ message: "Attendance added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error inserting attendance:", error);
    return Response.json({ error: "Failed to add attendance" }, { status: 500 });
  }
}

// PUT update existing attendance record by id
export async function PUT(request) {
  const { id, emp_id, date, attendance, hours } = await request.json();

  if (!id || !emp_id || !date || !attendance) {
    return Response.json({ error: "id, emp_id, date, and attendance are required" }, { status: 400 });
  }

  try {
    await sql`
      UPDATE attendance
      SET emp_id = ${emp_id}, date = ${date}, attendance = ${attendance}, hours = ${hours || 0}
      WHERE id = ${id}
    `;
    return Response.json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return Response.json({ error: "Failed to update attendance" }, { status: 500 });
  }
}

// DELETE attendance record by id: ?id=3
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json({ error: "id is required" }, { status: 400 });
  }

  try {
    await sql`DELETE FROM attendance WHERE id = ${id}`;
    return Response.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    return Response.json({ error: "Failed to delete attendance" }, { status: 500 });
  }
}
