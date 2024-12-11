import { neon } from "@neondatabase/serverless";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ message: "Missing id parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const images = await sql`SELECT * FROM images WHERE id = ${id}`;

    if (images.length === 0) {
      return new Response(JSON.stringify({ message: "Image not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(images[0]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=60, stale-while-revalidate",
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
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
