
// import { useState, useEffect } from 'react';

// export const useMilkRecords = () => {
//   const [farmer, setMilkRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMilkRecords = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch('/api/milk-records/');
//         if (!response.ok) {
//           throw new Error('Failed to fetch farmer records');
//         }
//         const data = await response.json();
//         setMilkRecords(data.farmer || []); 
//       } catch (err) {
//         setError('Error fetching farmer records');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMilkRecords();
//   }, []);

//   return {
//     farmer,
//     loading,
//     error,
//   };
// };



import { useState, useEffect } from 'react';

export const useMilkRecords = () => {
  const [milkRecords, setMilkRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMilkRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records/');
      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Error fetching milk records:", errorResponse);
        throw new Error('Failed to fetch milk records');
      }
      const data = await response.json();
      setMilkRecords(data || []); 
    } catch (err) {
      console.error("Error fetching milk records:", err);
      setError('Error fetching milk records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilkRecords();
  }, []);

  return {
    milkRecords,
    loading,
    error,
  };
};


// sharon

// import { useEffect, useState } from 'react';
// import { fetchMilkRecords } from '@/app/utils/fetchMilkRecords';  
// import { MilkRecord } from '@/app/utils/types';  

// export const useMilkRecords = (id: string) => {
//   const [data, setData] = useState<MilkRecord | null>(null);  
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState<Error | null>(null);  

//   useEffect(() => {
//     const getMilkRecords = async () => {
//       setLoading(true);  
//       try {
//         const person = await fetchMilkRecords(id);  
//         setData(person); 
//       } catch (err) {
//         setError(err as Error);  
//       } finally {
//         setLoading(false);  
//       }
//     };

//     if (id) {
//       getMilkRecords();  
//     }
//   }, [id]); 

//   return { data, loading, error };  
// };


// import { useState, useEffect } from 'react';
// import { fetchMilkRecords } from '@/app/utils/fetchMilkRecords';

// const useMilkRecord = (farmerId: number | undefined) => {
//     const [milkRecords, setMilkRecords] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchRecords = async () => {
//             setLoading(true);
//             try {
//                 if (farmerId !== undefined) {
//                     const data = await fetchMilkRecords(farmerId);
//                     setMilkRecords(data);
//                 } else {
//                     setMilkRecords([]);
//                 }
//             } catch (err) {
//                 setError('Failed to fetch milk records');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecords();
//     }, [farmerId]);

//     return { milkRecords, loading, error };
// };

// export default useMilkRecord;


// import { useState, useEffect } from 'react';

// const useMilkRecord = (farmerId: number | null) => {
//   const [milkRecords, setMilkRecords] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMilkRecord = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(`/api/milk-records?farmerId=${farmerId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch milk records');
//         }
//         const data = await response.json();
//         setMilkRecords(data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (farmerId) {
//       fetchMilkRecord();
//     }
//   }, [farmerId]);

//   return { milkRecords, loading, error, setMilkRecords };
// };

// export default useMilkRecord;
