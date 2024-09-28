import { MilkRecord, fetchMilkRecords } from '@/app/utils/fetchMilkRecords';
import { useState, useEffect } from 'react';

export const useFetchMilkRecords = (userId: string): { milkRecords: MilkRecord[], loading: boolean } => {
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMilkRecords = async () => {
      setLoading(true);
      try {
        const data = await fetchMilkRecords();
        setMilkRecords(data);
      } catch (error) {
        console.error("Error fetching milk records: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getMilkRecords();
    }
  }, []);

  return { milkRecords, loading };
};











// export const useFetchCreditScores = (userId: string): { creditScores: MilkRecord[], loading: boolean } => {
//   const [creditScores, setCreditScores] = useState<MilkRecord[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getCreditScores = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchMilkRecords();

//         const filteredScores = data.filter(score => score.farmer_id === Number(userId));
//         setCreditScores(filteredScores);
//       } catch (error) {
//         console.error("Error fetching credit scores: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getCreditScores();
//   }, []);

//   return { creditScores, loading };
// };