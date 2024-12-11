// /app/api/avatar/save-image/route.js
import { neon } from "@neondatabase/serverless";

export async function POST(request) {
  try {
    // Parse the incoming request body
    const { url } = await request.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, message: "URL is required" }),
        {
          status: 400,
        }
      );
    }

    // Connect to the Neon database
    const sql = neon(process.env.DATABASE_URL);

    // Insert the image URL into the 'images' table
    await sql("INSERT INTO images (url) VALUES ($1)", [url]);

    // Respond with success
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("Error saving image URL to database:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
      }
    );
  }
}

export async function GET(request) {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const inc = await sql("SELECT * FROM images");

    return new Response(JSON.stringify(inc), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data from the database:", error);

    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
