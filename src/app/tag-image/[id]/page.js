import ImageDisplay from "@/components/imageDisplay";

export default async function TagImage({ params }) {
  const { id } = await params;
  console.log(id);

  return (
    <div>
      <h1>Tag Image</h1>
      <p>Image ID: {id}</p>
      <ImageDisplay id={id} />
    </div>
  );
}
