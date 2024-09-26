'use client';

import { useState, useEffect } from 'react';
import { MilkRecord } from '../utils/types';
import { fetchMilkRecords } from '../api/milk records/route';

export const useMilkRecords = () => {
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMilkRecords = async () => {
      try {
        const data = await fetchMilkRecords();
        setMilkRecords(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setLoading(false);
      }
    };

    loadMilkRecords();
  }, []);

  return { milkRecords, loading, error };
};
