import { neon } from "@neondatabase/serverless";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  try {
    const sql = neon(process.env.DATABASE_URL);
    const imageQuery = await sql`
      SELECT * FROM images WHERE id = ${id}
    `;
    
    const tagsQuery = await sql`
      SELECT tag_data FROM tags WHERE image_id = ${id}
    `;
    
    // Assuming tags are stored as JSON in the 'tag_data' column
    const imageData = imageQuery[0];
    
    // Parse the tags and flatten them by extracting individual tag items
    const tags = tagsQuery
      .map((tag) => {
        try {
          return JSON.parse(tag.tag_data);
        } catch (error) {
          return null; // If parsing fails, return null (to be filtered out)
        }
      })
      .filter((tag) => tag !== null && Array.isArray(tag.tags) && tag.tags.length > 0) // Filter out invalid data
      .flatMap((tag) => tag.tags); // Flatten the structure to extract individual tag items

    // Return the image data along with the flattened tags
    return new Response(
      JSON.stringify({
        image: {
          id: imageData.id,
          url: imageData.url,
        },
        tags,  // This now contains only the individual tags, not nested in another 'tags' array
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching image and tags:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching image and tags" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
