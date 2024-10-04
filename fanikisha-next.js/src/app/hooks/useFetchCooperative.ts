import { useEffect, useState } from "react";
import { Cooperative } from "../utils/types";

export const useFetchCooperatives = () => {
  const [data, setData] = useState<Cooperative[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fanikisha-3beb7fcefffe.herokuapp.com/api/cooperative/"
        );
        if (!response.ok) throw new Error("Failed to fetch cooperatives");
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
