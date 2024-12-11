"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

export default function ImageDisplay({ id }) {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.get(`/api/avatar/get_image?id=${id}`);
        setImageData(response.data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchImage();
  }, [id]);

  useEffect(() => {
    if (imageData && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      canvas.width = imageRef.current.width;
      canvas.height = imageRef.current.height;
    }
  }, [imageData]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setStartPos({ x, y });
    setEndPos({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setEndPos({ x, y });
    drawRect();
  };

  const endDrawing = (e) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    // Prevent drawing if the mouse leaves the canvas during drawing
    const tag = prompt("Enter a tag for this selection:");
    if (tag) {
      setTags([...tags, { startPos, endPos, tag }]);
    }
    drawRect();
  };

  const drawRect = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw existing tags
    tags.forEach((tag) => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        tag.startPos.x,
        tag.startPos.y,
        tag.endPos.x - tag.startPos.x,
        tag.endPos.y - tag.startPos.y
      );
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(
        tag.startPos.x,
        tag.startPos.y,
        tag.endPos.x - tag.startPos.x,
        tag.endPos.y - tag.startPos.y
      );
      ctx.fillStyle = "white";
      ctx.font = "14px Arial";
      ctx.fillText(tag.tag, tag.startPos.x, tag.startPos.y - 5);
    });

    // Draw current selection (only when drawing)
    if (isDrawing) {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        startPos.x,
        startPos.y,
        endPos.x - startPos.x,
        endPos.y - startPos.y
      );
    }
  };

  const saveTags = async () => {
    try {
      // Check if tags are available before sending the request
      if (tags.length === 0) {
        alert("No tags to save.");
        return;
      }

      console.log("Sending tags to server:", { id, tags });

      // Send the tags data to the server
      const response = await fetch("/api/avatar/save_tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, tags: tags }),
      });

      // Check if the response is successful
      const result = await response.json();
      console.log("Server response:", result);

      if (response.ok && result.success) {
        // If the server responds with success, notify the user
        alert("Tags saved successfully!");
      } else {
        // If the response is not ok or success is not true, show an error
        console.error("Failed to save tags:", result);
        alert("Failed to save tags. Please try again.");
      }
    } catch (err) {
      // Log any errors that occur during the fetch operation
      console.error("Error saving tags:", err);
      alert("Error saving tags. Please try again.");
    }
  };

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
          width={250}
          height={250}
          alt="Uploaded image"
          className="h-auto max-w-full"
        />
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing} // Only end drawing on mouse up
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <p className="mt-2">ID: {imageData.id}</p>
      <p>URL: {imageData.url}</p>
      <div className="mt-4">
        <h3 className="mb-2 text-xl font-semibold">Tags:</h3>
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag.tag}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={saveTags}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Save Tags
      </button>
    </div>
  );
}
