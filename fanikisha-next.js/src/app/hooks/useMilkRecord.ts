// import { useState, useEffect } from 'react';
// export const useMilkRecords = () => {
//   const [milkRecords, setMilkRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const fetchMilkRecords = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records/');
//       if (!response.ok) {
//         const errorResponse = await response.text();
//         console.error("Error fetching milk records:", errorResponse);
//         throw new Error('Failed to fetch milk records');
//       }
//       const data = await response.json();
//       setMilkRecords(data || []);
//     } catch (err) {
//       console.error("Error fetching milk records:", err);
//       setError('Error fetching milk records');
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchMilkRecords();
//   }, []);
//   return {
//     milkRecords,
//     loading,
//     error,
//   };
// }; 

import { useEffect, useState } from "react";
import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";
export const useMilkRecord = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadMilkRecord = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMilkRecords();
        setData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching milk record", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error fetching milk record:", err);
          setError("Error fetching milk record");
        }
      } finally {
        setLoading(false);
      }
    };
    loadMilkRecord();
  }, []);
  return { data, loading, error };
};




