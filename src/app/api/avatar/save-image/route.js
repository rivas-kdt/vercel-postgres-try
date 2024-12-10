// /app/api/avatar/save-image/route.js
import { neon } from '@neondatabase/serverless';

export async function POST(request) {
  try {
    // Parse the incoming request body
    const { url } = await request.json();

    if (!url) {
      return new Response(JSON.stringify({ success: false, message: 'URL is required' }), {
        status: 400,
      });
    }

    // Connect to the Neon database
    const sql = neon(process.env.DATABASE_URL);

    // Insert the image URL into the 'images' table
    await sql('INSERT INTO images (url) VALUES ($1)', [url]);

    // Respond with success
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error('Error saving image URL to database:', error);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}
