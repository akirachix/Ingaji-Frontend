// export const fetchMilkRecords = async () => {
//   try {
//     const response = await fetch('/api/milk_records', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Fetch error:', error); 
//     throw new Error('Failed to fetch data');
//   }
// };

import { MilkRecord } from "./types";

const baseUrl = process.env.BASE_URL || '/api/milk-records/'; 

export const fetchMilkRecords = async (id: number): Promise<MilkRecord> => {
    try {
        const response = await fetch(`${baseUrl}${id}/`); 
        if (!response.ok) {
            throw new Error('Failed to fetch milk records');
        }
        const data: MilkRecord = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching milk records:', error);
        throw error;
    }
};

