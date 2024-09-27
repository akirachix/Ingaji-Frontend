

import { MilkRecord } from "./types";

  
  const url ='/api/milk-records/1/'
  
  
  export async function useMilkRecords(details: MilkRecord) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Could not fetch milk records failed');
    }
  
    return await response.json();
  }
  

export const fetchMilkRecords = async () => {
    try {
      const response = await fetch('/api/milkRecords');
      if (!response.ok) {
        throw new Error('Failed to fetch milk records'+ response.text());
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
