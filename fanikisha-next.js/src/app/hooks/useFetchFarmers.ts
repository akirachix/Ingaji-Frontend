// import { useEffect, useState } from "react";
// import { Farmer } from "../utils/types";
// import { displayFarmers } from "../utils/fetchAccounts";

// export const useFetchFarmers = () => {
//   const [data, setData] = useState<Farmer[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchFarmers = async () => {
//       try {
//         const result = await displayFarmers(
//           "https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers"
//         );
        
//         if (result && Array.isArray(result.farmers)) {
//           setData(result.farmers);
//         } else {
//           throw new Error("Invalid data format");
//         }
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err);
//         } else {
//           setError(new Error("An unknown error occurred"));
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFarmers();
//   }, []);

//   return { data, isLoading, error };
// };


// src/app/hooks/useMilkRecords.js
import { useState, useEffect } from 'react';
import { fetchMilkRecords } from '@/app/utils/fetchMilkRecords';
const useMilkRecords = (farmerId: number | undefined) => {
  const [milkRecords, setMilkRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (farmerId !== undefined) {
          const data = await fetchMilkRecords(farmerId);
          setMilkRecords(data);
        } else {
          // Handle the case where farmerId is undefined (optional)
          setMilkRecords([]);
        }
      } catch (err) {
        setError('Failed to fetch milk records');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [farmerId]);

  return { milkRecords, loading, error };
};

export default useMilkRecords;
