"use client"
import { useEffect, useState } from "react";

export default function Display() {
    const [data,setData]=useState([]);
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "/api/avatar/save-image"
            );
            setData(response.data);
          } catch (err) {
            setError(err.message);
          }
        };
        fetchData();
      }, []);
      console.log(data)
  return (
    <div>
        Ola
    </div>
  )
}
