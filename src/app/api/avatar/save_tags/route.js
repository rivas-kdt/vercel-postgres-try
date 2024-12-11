// /app/api/avatar/save-image/route.js
import { neon } from "@neondatabase/serverless";

export async function POST(request) {
  try {
    const { id, tags } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "ID is required" }),
        {
          status: 400,
        }
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    // Insert the image URL into the 'images' table
    await sql(
      `INSERT INTO tags (image_id, tag_data) VALUES (${id}, ${JSON.stringify(
        tags
      )})`
    );

    // Respond with success
    return new Response(
      JSON.stringify({ message: "Tags saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("Error saving tags:", error);

    return new Response(
      JSON.stringify({
        message: "Error saving tags",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
