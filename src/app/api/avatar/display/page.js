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
    fetchData();
  }, []);
  console.log(data);
  console.log(error);
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {data.map((img) => (
        <div key={img.id} className="bg-blue-500">
          <Image src={img.url} width="0" height="0" sizes="20vw" loading="lazy" className="w-full h-auto "></Image>
        </div>
      ))}
    </div>
  );
}
