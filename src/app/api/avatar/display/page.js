"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Display() {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/avatar/save-image");
        setData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000 * 5); // in milliseconds
    return () => clearInterval(intervalId);
  }, []);

  console.log(data);
  console.log(error);
  return (
    <div className="flex items-center justify-center w-screen h-screen gap-2">
      <div className="w-full max-w-[90%]">
        <div className="gap-2 columns-1 sm:columns-2 md:columns-5">
          {data.map((img) => (
            <div key={img.id} className="relative mb-4 cursor-pointer break-inside-avoid" href={`/tag-image/${img.id}`}>
              <Image
                src={img.url}
                sizes="250px"
                loading="lazy"
                className="w-full h-auto "
              ></Image>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
