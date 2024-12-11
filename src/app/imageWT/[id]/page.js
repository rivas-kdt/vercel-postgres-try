"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function ImageDisplay() {
  const [imageData, setImageData] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const pathname = usePathname();
  const id = pathname.slice(9); // Get image ID from URL

  useEffect(() => {
    if (!id) return; // Wait until the ID is available

    // Fetch image data and tags from the server
    async function fetchImageData() {
      try {
        const response = await axios.get(`/api/avatar/get_imageT?id=${id}`);
        const { image, tags } = response.data;
        setImageData(image);
        setTags(tags); // Set tags correctly
      } catch (err) {
        setError(err.message);
      }
    }

    fetchImageData();
  }, [id]);

  useEffect(() => {
    if (imageData && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const img = imageRef.current;

      // Calculate the scaling factor based on the image's natural dimensions
      const scaleX = canvas.width / img.naturalWidth;
      const scaleY = canvas.height / img.naturalHeight;

      // Set the canvas size to match the image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image and tags when data is loaded
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

      // Draw the image
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Draw the tags (rectangles)
      tags.forEach((tag) => {
        const { label, position } = tag;
        const { start, end } = position;

        // Apply scaling factor to tag positions
        const scaledStartX = start.x * scaleX;
        const scaledStartY = start.y * scaleY;
        const scaledEndX = end.x * scaleX;
        const scaledEndY = end.y * scaleY;

        // Draw rectangle for each tag
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          scaledStartX,
          scaledStartY,
          scaledEndX - scaledStartX,
          scaledEndY - scaledStartY
        );

        // Draw the tag label
        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.fillText(label, scaledStartX, scaledStartY - 5);
      });
    }
  }, [imageData, tags]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!imageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <h2 className="mb-4 text-2xl font-bold">Image Details</h2>
      <div className="relative inline-block">
        <Image
          ref={imageRef}
          src={imageData.url}
          alt="Image with Tags"
          width={imageData.width || 500} // Default width if not provided
          height={imageData.height || 500} // Default height if not provided
          className="h-auto max-w-full"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <p className="mt-2">ID: {imageData.id}</p>
      <p>URL: {imageData.url}</p>
      <div className="mt-4">
        <h3 className="mb-2 text-xl font-semibold">Tags:</h3>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              {tag.label} (x1: {tag.position.start.x}, y1: {tag.position.start.y}, x2:{" "}
              {tag.position.end.x}, y2: {tag.position.end.y})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
