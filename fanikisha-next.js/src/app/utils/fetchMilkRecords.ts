import { useEffect, useState } from 'react';
import { fetchMilkRecords } from './fetchMilkRecord';

export const useMilkRecord = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadMilk = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMilkRecords();
        setData(data);
      } catch (err: unknown){
        if (err instanceof Error){
          console.error('Error fetching milk record:', err.message);
          setError(err.message)
        }else{
          console.error('Unknown error fetching milk record:',err);
          setError('Error fetching milk record');
        }
      }finally{
        setLoading(false);
      }
    };
    loadMilk();
    }, []);
    
  return { data, loading, error };
};
export { fetchMilkRecords };

