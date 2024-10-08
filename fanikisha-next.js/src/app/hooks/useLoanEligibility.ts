import { useEffect, useState } from "react";
import { fetchCreditScore } from "../utils/fetchCreditScore";

export const useLoanEligibility = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoanEligibility = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedCreditScore = await fetchCreditScore();
        setData(fetchedCreditScore);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching credit:", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error fetching credit score:", err);
          setError("Error fetching credit score");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLoanEligibility();
  }, []);

  return { data, loading, error };
};
