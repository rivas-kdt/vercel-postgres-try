// app/api/try/inc/route.js
import { neon } from '@neondatabase/serverless';

export async function GET(request) {
  try {
    // Connect to the Neon database using the DATABASE_URL environment variable
    const sql = neon(process.env.DATABASE_URL2);
    
    // Query all rows from the 'inc' table
    const inc = await sql('SELECT * FROM exp_cat');
    
    // Return the data as JSON
    return new Response(JSON.stringify(inc), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowed HTTP methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allowed headers
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
