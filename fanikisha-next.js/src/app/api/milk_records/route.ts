import {NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;




export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/milk-records/`);
    
    if (!response.ok) {
      const textResponse = await response.text();
      console.error('GET error response:', textResponse);
      return NextResponse.json(
        { error: textResponse || 'Failed to fetch milk records' },
        { status: response.status }
      );
    }

    const farmers = await response.json();
    return NextResponse.json(farmers, { status: 200 });

  } catch (error) {
    console.error('Error fetching milk records:');
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}


// export async function GET() {
//     const fetchWithRetry = async (url: string, retries: number = 3, delay: number = 1000): Promise<any> => {
//       try {
//         const response = await fetch(url);
        
//         if (!response.ok) {
//           const textResponse = await response.text();
//           console.error('GET error response:', textResponse);
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
  
//         return await response.json();
//       } catch (error) {
//         if (retries > 0) {
//           console.log(`Retrying... (${retries} retries left)`);
//           await new Promise(res => setTimeout(res, delay));
//           return fetchWithRetry(url, retries - 1, delay);
//         } else {
//           throw error;
//         }
//       }
//     };
  
//     try {
//       const farmers = await fetchWithRetry(`${baseURL}/api/milk-records/`);
//       return NextResponse.json(farmers, { status: 200 });
  
//     } catch (error) {
//       console.error('Error fetching milk records:', error);
//       return NextResponse.json(
//         { error: 'An unexpected error occurred: ' + (error as Error).message },
//         { status: 500 }
//       );
//     }
//   }
  