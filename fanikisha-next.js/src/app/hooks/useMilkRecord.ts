
import { useEffect, useState } from "react";
import { fetchMilkRecords } from "../utils/fetchMilkRecords";
import { MilkRecord, MilkRecordsResponse } from "../utils/types";

export const useMilkRecord = () => {
  const [data, setData] = useState<MilkRecord[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const loadMilkRecord = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: MilkRecordsResponse = await fetchMilkRecords();
        console.log("API response: ", response); 
        
        if (Array.isArray(response)) {  
          setData(response);
        } else if (response.records) {  
          setData(response.records);
        } else {
          setError("Invalid data structure");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching milk record", err.message);
          setError(err.message);
        } else {
          setError("Unknown error fetching milk record");
        }
      } finally {
        setLoading(false);
      }
    };

    loadMilkRecord(); 
  }, []); 

  return { data, loading, error }; 
};












