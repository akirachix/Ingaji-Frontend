// // // import { MilkRecord } from "./types";

// // // export const fetchMilkRecords = async (): Promise<MilkRecord[]> => {
// // //     try {
// // //         const response = await fetch(`/api/milk_records`, {
// // //             method: 'GET',
// // //             headers: {
// // //                 'Content-Type': 'application/json',
// // //             },
        
// // //         });

// // //         if (!response.ok) {
// // //             throw new Error(`Error: ${response.status} ${response.statusText}`);
// // //         }

// // //         return await response.json();

// // //     } catch (error) {
// // //         throw new Error((error as Error).message || 'Failed to fetch milk records');
// // //     }
// // // };

// // // utils/fetchMilkRecords.ts
// // export interface MilkRecord {
// //     record_id: number;
// //     farmer_id: number;
// //     milk_quantity: number;
// //     price: number;
// //     date: string;
// //   }
  
// //   export const fetchMilkRecords = async ()=> {
// //     try {
// //       const response = await fetch(`/api/milk_records`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });
  
// //       if (!response.ok) {
// //         throw new Error(`Error: ${response.status} ${response.text()}`);
// //       }
  
// //       return await response.json();
// //     } catch (error) {
// //       throw new Error((error as Error).message || 'Failed to fetch milk records');
// //     }
// //   };
  


// // // import { MilkRecord } from "./types";

  
// // //   const url ='/api/milk-records/1/'
  
  
// // //   export async function useMilkRecords(details: MilkRecord) {
// // //     const response = await fetch(url, {
// // //       method: 'GET',
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //       },
// // //       body: JSON.stringify(details),
// // //     });
  
// // //     if (!response.ok) {
// // //       const errorData = await response.json();
// // //       throw new Error(errorData.message || 'Could not fetch milk records failed');
// // //     }
  
// // //     return await response.json();
// // //   }
  

// // // export const fetchMilkRecords = async () => {
// // //     try {
// // //       const response = await fetch('/api/milkRecords');
// // //       if (!response.ok) {
// // //         throw new Error('Failed to fetch milk records'+ response.text());
// // //       }
// // //       const data = await response.json();
// // //       return data;
// // //     } catch (error) {
// // //       console.error(error);
// // //       throw error;
// // //     }
// // //   };



// export interface MilkRecord {
//   record_id: number;
//   farmer_id: number;
//   milk_quantity: number;
//   price: number;
//   date: string;
// }



// export const fetchMilkRecords = async () => {
//   try {
//     const response = await fetch('/api/milk_records');
//     if (!response.ok) {
//       throw new Error('Failed to fetch milk records: ' + (await response.text()));
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export async function useMilkRecords(id: number, details: MilkRecord) {
//   try {
//     const response = await fetch(`/api/milk-records/${id}/`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(details),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch milk records: ' + (await response.text()));
//     }

//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }



export interface MilkRecord {
  record_id: number;
  farmer_id: number;
  milk_quantity: number;
  price: number;
  date: string;
}

export const fetchMilkRecords = async () => {
  try {
    const response = await fetch('/api/milk_records');
    if (!response.ok) {
      throw new Error('Failed to fetch milk records: ' + (await response.text()));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMilkRecord = async (id: number) => {
  try {
    const response = await fetch(`/api/milk_records/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch milk record: ' + (await response.text()));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

