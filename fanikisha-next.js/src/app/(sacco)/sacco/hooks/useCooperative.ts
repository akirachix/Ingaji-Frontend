import { useEffect, useState } from 'react';
import { fetchTotalCooperative } from '../../../utils/fetchTotalCooperative';

export const useCooperative = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCooperative = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTotalCooperative();
        setData(data);
      } catch (err: unknown){
        if (err instanceof Error){
          console.error('Error fetching cooperative:', err.message);
          setError(err.message)
        }else{
          console.error('Unknown error fetching coopeerative:',err);
          setError('Error fetching cooperative');
        }
      }finally{
        setLoading(false);
      }
    };
    loadCooperative();
    }, []);
    
  return { data, loading, error };
};

