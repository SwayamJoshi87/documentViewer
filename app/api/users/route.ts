import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import { userTable } from "../../../drizzle/schema"; // Import the schema you created
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(sql);


export async function GET(req: NextRequest) {
  try {
    // Fetch users from the database
    const users = await db.select().from(userTable);
    
    // Format the response with relevant fields (you can join with comments and tags if necessary)
    const formattedUsers = users.map(user => ({
      user: user.name,
      comments: user.totalInterations, // assuming totalInterations refers to comments
      tags: 0, // fetch or calculate tags if needed
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}