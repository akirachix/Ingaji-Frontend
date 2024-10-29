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












