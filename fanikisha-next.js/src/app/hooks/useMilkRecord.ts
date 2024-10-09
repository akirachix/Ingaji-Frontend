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


// import { useEffect, useState } from "react";
// import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";
// export const useMilkRecord = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   useEffect(() => {
//     const loadMilkRecord = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchMilkRecords();
//         setData(data);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           console.error("Error fetching milk record", err.message);
//           setError(err.message);
//         } else {
//           console.error("Unknown error fetching milk record:", err);
//           setError("Error fetching milk record");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadMilkRecord();
//   }, []);
//   return { data, loading, error };
// };





// // hooks/useMilkRecord.ts
// import { useEffect, useState } from 'react';

// export const useMilkRecord = (id?: string) => {
//   const [data, setData] = useState<any[]>([]); // Define your type accordingly
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       return;
//     }

//     const fetchRecords = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`/api/milk-records/${id}`); // Adjust your API endpoint
//         if (!response.ok) throw new Error('Failed to fetch records');
//         const records = await response.json();
//         setData(records);
//       } catch (err) {
//         // Assert that err is an Error object
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError('An unknown error occurred');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecords();
//   }, [id]);

//   return { data, loading, error };
// };



import { useEffect, useState } from "react";
import { fetchMilkRecords } from "../utils/fetchMilkRecords";

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






// import { useState, useEffect } from "react";
// import { MilkRecord } from "../utils/types";

// export const useFetchMilkRecords = (userId: string) => {
//   const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadMilkRecords = async () => {
//       setLoading(true);
//       setError(null);
//       console.log("Fetching milk records for user ID:", userId);
//       try {
//         const response = await fetch(
//           "https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records/"
//         );
//         const data = await response.json();
//         const filteredRecords = data.filter(
//           (record: { farmer_id: number }) => record.farmer_id === Number(userId)
//         );
//         setMilkRecords(filteredRecords);
//         console.log("Milk records fetched successfully:", filteredRecords);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           console.error("Error fetching milk records:", err.message);
//           setError(err.message);
//         } else {
//           console.error("Unknown error fetching milk records:", err);
//           setError("Error fetching milk records");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       loadMilkRecords();
//     }
//   }, [userId]);

//   return { milkRecords, loading, error };
// };


