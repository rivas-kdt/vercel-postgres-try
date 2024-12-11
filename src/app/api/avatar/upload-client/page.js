"use client";

import { upload } from "@vercel/blob/client";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);

  return (
    <>
      <h1>Upload Your Avatar</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const file = inputFileRef.current.files[0];

          // Upload the file to Vercel Blob
          const newBlob = await upload(file.name, file, {
            access: "public", // Ensure the blob is publicly accessible
            handleUploadUrl: "/api/avatar/upload-client-route", // Custom URL to handle the upload
          });

          // Store the blob URL in state
          setBlob(newBlob);

          // Send the URL to your server to save it in the Neon database
          const response = await fetch("/api/avatar/save-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: newBlob.url }),
          });

          // Handle server response (optional)
          const result = await response.json();
          if (result.success) {
            alert("Image uploaded and URL saved to database!");
          } else {
            alert("Failed to save image URL to database");
          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
