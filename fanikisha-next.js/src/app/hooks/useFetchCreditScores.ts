import { useState, useEffect } from "react";
import { CreditScore } from "../utils/types";

export const useFetchCreditScores = (userId: string) => {
  const [creditScores, setCreditScores] = useState<CreditScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCreditScores = async () => {
      setLoading(true);
      setError(null);
      console.log("Fetching credit scores for user ID:", userId);
      try {
        const response = await fetch(
          "https://fanikisha-3beb7fcefffe.herokuapp.com/api/credit-scores/"
        );
        const data = await response.json();
        const filteredScores = data.filter(
          (score: { farmer_id: number }) => score.farmer_id === Number(userId)
        );
        setCreditScores(filteredScores);
        console.log("Credit scores fetched successfully:", filteredScores);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching credit scores:", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error fetching credit scores:", err);
          setError("Error fetching credit scores");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadCreditScores();
    }
  }, [userId]);

  return { creditScores, loading, error };
};