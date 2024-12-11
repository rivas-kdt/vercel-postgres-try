"use client";

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

          const response = await fetch(
            `/api/avatar/upload-server-route?filename=${file.name}`,
            {
              method: "POST",
              body: file,
            }
          );

          const newBlob = await response.json();

          setBlob(newBlob);
          
          const response2 = await fetch("/api/avatar/save-image", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: newBlob.url }),
          });

          const result = await response2.json();
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
