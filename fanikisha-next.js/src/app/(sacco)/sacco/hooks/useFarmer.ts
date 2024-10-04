import { useEffect, useState } from 'react';
import { fetchFarmers } from '../utils/fetchNumberOfFarmers';

export const useFarmers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadFarmers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFarmers();
        setData(data);
      } catch (err: unknown){
        if (err instanceof Error){
          console.error('Error fetching farmers', err.message);
          setError(err.message)
        }else{
          console.error('Unknown error fetching farmers:',err);
          setError('Error fetching farmers');
        }
      }finally{
        setLoading(false);
      }
    };
    loadFarmers();
    }, []);
  return { data, loading, error };
};