import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);


//GET employee
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const result = await sql`SELECT * FROM employee WHERE id = ${id}`;
      if (result.length === 0) {
        return Response.json({ error: "Employee not found" }, { status: 404 });
      }
      return Response.json(result[0]);
    } else {
      const result = await sql`SELECT * FROM employee`;
      return Response.json(result);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}


//POST employee
export async function POST(request) {
  const {name, phone_number, address, date_of_joining, salary } = await request.json();

  try {
    await sql`
      INSERT INTO employee (name, phone_number, address, date_of_joining, salary)
      VALUES (${name}, ${phone_number}, ${address}, ${date_of_joining}, ${salary})
    `;
    return Response.json({ message: "Employee added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error inserting employee:", error);
    return Response.json({ error: "Failed to add employee" }, { status: 500 });
  }
}


// UPDATE employee by ID
export async function PUT(request) {
  const { id, name, phone_number, address, date_of_joining, salary } = await request.json();

  try {
    await sql`
      UPDATE employee
      SET name = ${name}, phone_number = ${phone_number}, address = ${address},
          date_of_joining = ${date_of_joining}, salary = ${salary}
      WHERE id = ${id}
    `;
    return Response.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    return Response.json({ error: "Failed to update employee" }, { status: 500 });
  }
}


// DELETE employee by ID
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Failure, ID is required" },
      { status: 400 }
    );
  }

  try {
    const result = await sql`DELETE FROM employee WHERE id = ${id}`;
    return Response.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return Response.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
