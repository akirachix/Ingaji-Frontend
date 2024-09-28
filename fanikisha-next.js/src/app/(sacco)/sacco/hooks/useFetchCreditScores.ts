import { useState, useEffect } from 'react';
import { CreditScore, fetchCreditScores } from '@/app/utils/fetchCreditScore';

export const useFetchCreditScores = (userId: string): { creditScores: CreditScore[], loading: boolean } => {
  const [creditScores, setCreditScores] = useState<CreditScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCreditScores = async () => {
      setLoading(true);
      try {
        const data = await fetchCreditScores();

        const filteredScores = data.filter(score => score.farmer_id === Number(userId));
        setCreditScores(filteredScores);
      } catch (error) {
        console.error("Error fetching credit scores: ", error);
      } finally {
        setLoading(false);
      }
    };

    getCreditScores();
  }, []);

  return { creditScores, loading };
};