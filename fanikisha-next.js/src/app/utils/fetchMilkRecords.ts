
import { MilkRecord } from "./types";

  
  const url ='/api/milk-records/'
  
  
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
  