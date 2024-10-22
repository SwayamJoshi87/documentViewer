import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import * as schema from '../../../drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';

const db = drizzle(sql);

// Handle GET requests
export async function GET(req: NextRequest) {
    try {
      // Fetch recent comments from the database using Drizzle ORM
      const comments = await db
        .select({
          id: schema.commentsTable.id,
          comment: schema.commentsTable.comment,
          createdAt: schema.commentsTable.createdAt,
          userId: schema.commentsTable.user_id,
          docId: schema.commentsTable.page_id,
        })
        .from(schema.commentsTable)
        .orderBy(schema.commentsTable.createdAt)
        .limit(10);
  
      // Format the response to match your needs
      const formattedComments = comments.map((comment) => ({
        date: new Date(comment.createdAt).toLocaleDateString(), // Formatting date
        time: new Date(comment.createdAt).toLocaleTimeString(), // Formatting time
        user: comment.userId, // Replace with user name if needed (e.g., by joining users table)
        doc: comment.docId, // Placeholder for document details
        comment: comment.comment,
      }));
  
      // Return the formatted comments as JSON
      return NextResponse.json(formattedComments, { status: 200 });
    } catch (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }
  }