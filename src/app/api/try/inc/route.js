// app/api/try/inc/route.js
import { neon } from '@neondatabase/serverless';

export async function GET(request) {
  try {
    // Connect to the Neon database using the DATABASE_URL environment variable
    const sql = neon(process.env.DATABASE_URL);
    
    // Query all rows from the 'inc' table
    const inc = await sql('SELECT * FROM inc');
    
    // Return the data as JSON
    return new Response(JSON.stringify(inc), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    
    // If an error occurs, return a 500 status with the error message
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
