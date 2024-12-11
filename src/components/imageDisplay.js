"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function ImageDisplay({ id }) {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(`/api/avatar/get-image?id=${id}`);
        setImageData(response.data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchImage();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!imageData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Image Details</h2>
      <Image
        src={imageData.url}
        sizes="250px"
        loading="lazy"
        className="w-full h-auto "
      ></Image>
      <p>ID: {imageData.id}</p>
      <p>URL: {imageData.url}</p>
    </div>
  );
}
