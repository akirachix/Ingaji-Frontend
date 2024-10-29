import { useEffect, useState } from "react";
import { fetchScores } from "../utils/fetchScores";

export const useScore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedScore = await fetchScores();
        setData(fetchedScore);
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
    fetchScore();
  }, []);

  return { data, loading, error };
};

