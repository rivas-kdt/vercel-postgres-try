import ImageDisplay from "@/components/imageDisplay";


export default function TagImage({ params }) {
  const { id } = params;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Tag Image</h1>
      <p className="mb-4">Image ID: {id}</p>
      <ImageDisplay id={id} />
    </div>
  );
}

