// import { MilkRecord } from "./types";

// export const fetchMilkRecords = async (): Promise<MilkRecord[]> => {
//     try {
//         const response = await fetch(`/api/milk_records`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
        
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }

//         return await response.json();

//     } catch (error) {
//         throw new Error((error as Error).message || 'Failed to fetch milk records');
//     }
// };

// utils/fetchMilkRecords.ts
export interface MilkRecord {
    record_id: number;
    farmer_id: number;
    milk_quantity: number;
    price: number;
    date: string;
  }
  
  export const fetchMilkRecords = async (): Promise<MilkRecord[]> => {
    try {
      const response = await fetch(`/api/milk_records`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message || 'Failed to fetch milk records');
    }
  };
  
