
// export const fetchMilkRecords = async () => {
//     try {
//       const response = await fetch('/api/farmers');
//       if (!response.ok) {
//         throw new Error('Failed to fetch milk records'+ response.text());
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
  

// utils/fetchMilkRecords.ts
// export const fetchMilkRecords = async () => {
//   const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records/');
//   if (!response.ok) {
//     throw new Error('Failed to fetch milk records');
//   }
//   const data = await response.json();
//   return data; // Ensure this data contains quantity
// };


// export const fetchMilkRecords = async (farmerId: number | undefined) => {
//   try {
//     const response = await fetch(`https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records?farmerId=${farmerId}`);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch milk records');
//     }
    
//     const data = await response.json();
//     return data; 
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error; 
//   }
// };

// sharoon
// import { MilkRecord } from "./types";

// const baseUrl = '/api/milk-records/{id}';

// export const fetchMilkRecords = async (id: string): Promise<MilkRecord> => {
//     try {
//         const response = await fetch(`${baseUrl}${id}`);
 
        
        
//         if (!response.ok) {
//             throw new Error('Failed to fetch milk records');
//         }

//         const data = await response.json();
      
//         return data;
//     } catch (error) {
//         console.error('Error fetching milk records:', error);
//         throw error;
//     }
// };
  

import { MilkRecord } from "./types";

const baseUrl = '/api/milk-records/';

export const fetchMilkRecords = async (id: number): Promise<MilkRecord[]> => {
    try {
        const response = await fetch(`${baseUrl}${id}`);

        if (!response.ok) {
            throw new Error('Failed to fetch milk records');
        }

        const data = await response.json();
      
        return data;
    } catch (error) {
        console.error('Error fetching milk records:', error);
        throw error;
    }
};



