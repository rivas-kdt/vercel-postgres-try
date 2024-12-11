import { neon } from "@neondatabase/serverless";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    const sql = neon(process.env.DATABASE_URL);

    const inc = await sql("SELECT * FROM images WHERE id = ?", [id]);

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
