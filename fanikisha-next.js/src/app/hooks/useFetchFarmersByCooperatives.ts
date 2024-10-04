
import { useEffect, useState } from "react";
import { Farmer } from "../utils/types"; 

export const useFetchFarmersByCooperative = (cooperative_id: number) => {
  const [data, setData] = useState<Farmer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch(`/api/farmers?cooperative_id=${cooperative_id}`); 
        if (!response.ok) {
          throw new Error("Failed to fetch farmers");
        }
        const farmers = await response.json();
        setData(farmers);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmers();
  }, [cooperative_id]);

  return { data, isLoading, error };
};
