import { useEffect, useState } from "react";
import { Farmer } from "../utils/types";
import { displayFarmers } from "../utils/fetchAccounts";

export const useFetchFarmers = () => {
  const [data, setData] = useState<Farmer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const result = await displayFarmers(
          "https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers"
        );
        
        if (result && Array.isArray(result.farmers)) {
          setData(result.farmers);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  return { data, isLoading, error };
};
