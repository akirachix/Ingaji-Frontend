
import { useEffect, useState } from "react";
import { fetchMilkRecords } from "../utils/fetchMilkRecords";
import { MilkRecord, MilkRecordsResponse } from "../utils/types";

export const useMilkRecord = () => {
  const [data, setData] = useState<MilkRecord[]>([]); // State for milk records
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  // loadMilkRecord function inside useEffect
  useEffect(() => {
    const loadMilkRecord = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: MilkRecordsResponse = await fetchMilkRecords();
        console.log("API response: ", response); // Check the structure of the response
        
        if (Array.isArray(response)) {  // Check if the response itself is an array
          setData(response);
        } else if (response.records) {  // If response has a 'records' field
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

    loadMilkRecord(); // Call the function to load milk records on component mount
  }, []); // Empty dependency array means it runs once when the component mounts

  return { data, loading, error }; 
};












