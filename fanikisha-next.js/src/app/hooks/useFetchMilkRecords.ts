import { useState, useEffect } from "react";
import { MilkRecord } from "@/app/utils/fetchMilkRecords";

export const useFetchMilkRecords = (userId: string) => {
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMilkRecords = async () => {
      setLoading(true);
      setError(null);
      console.log("Fetching milk records for user ID:", userId);
      try {
        const response = await fetch(
          "https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records/"
        );
        const data = await response.json();
        const filteredRecords = data.filter(
          (record: { farmer_id: number }) => record.farmer_id === Number(userId)
        );
        setMilkRecords(filteredRecords);
        console.log("Milk records fetched successfully:", filteredRecords);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching milk records:", err.message);
          setError(err.message);
        } else {
          console.error("Unknown error fetching milk records:", err);
          setError("Error fetching milk records");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadMilkRecords();
    }
  }, [userId]);

  return { milkRecords, loading, error };
};
