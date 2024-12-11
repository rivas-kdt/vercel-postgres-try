import { neon } from "@neondatabase/serverless";

export async function POST(request) {
  try {
    // Parse incoming request data
    const { id, tags } = await request.json();

    // Validate incoming tags data
    if (!Array.isArray(tags) || tags.length === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid tags data" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Map tags to the required format
    const tagData = {
      tags: tags.map((tag) => ({
        position: {
          start: {
            x: tag.startPos.x,
            y: tag.startPos.y,
          },
          end: {
            x: tag.endPos.x,
            y: tag.endPos.y,
          },
        },
        label: tag.tag,
        created_at: new Date().toISOString(),
      })),
    };

    // Initialize database connection
    const sql = neon(process.env.DATABASE_URL);

    // Insert tag data into the database
    await sql("INSERT INTO tags (image_id, tag_data) VALUES ($1, $2)", [
      id,
      JSON.stringify(tagData),
    ]);

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: "Tags saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Log error and return response
    console.error("Error saving tags:", error);

    return new Response(
      JSON.stringify({
        success: false,
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
