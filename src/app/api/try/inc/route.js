export async function GET(request) {
  const sql = neon(process.env.DATABASE_URL);
  const inc = await sql("SELECT * FROM inc");
  return new Response(JSON.stringify(inc), {
    status: 200,
  });
}
