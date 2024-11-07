import { useState, useEffect } from 'react';

interface CreditScore {
  farmerId: string;
  score: number;
  creditWorthiness: string;
  loanRange: string;
  lastCheckedDate: string;
  isEligible: boolean;
}

interface UseCreditScoresReturn {
  creditScores: CreditScore[] | null;
  loading: boolean;
  error: string | null;
}

const useCreditScores = (): UseCreditScoresReturn => {
  const [creditScores, setCreditScores] = useState<CreditScore[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreditScores = async () => {
      try {
        const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/credit-scores/');
        if (!response.ok) {
          throw new Error('Failed to fetch credit scores');
        }

        const data: CreditScore[] = await response.json();
        setCreditScores(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };

    fetchCreditScores();
  }, []);

  return { creditScores, loading, error };
};

export default useCreditScores;
