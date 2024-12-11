async function fetchImage(id) {
  try {
    const response = await axios.get(`/api/avatar/get-image?id=${id}`);
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export default async function TagImage({ params }) {
  const { id } = await params;
  const data = fetchImage(id);
  console.log(id);
  console.log(data);
  
  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
