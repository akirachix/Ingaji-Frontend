// import { NextRequest, NextResponse } from 'next/server';
// export async function GET() {
//   const baseUrl = process.env.BASE_URL;

//   try {
//     const response = await fetch(`${baseUrl}/api/milk-records/`);

//     if (!response.ok) {
//       const textResponse = await response.text();

//       return NextResponse.json(
//         { error: textResponse || 'Failed to fetch milk records' },
//         { status: response.status }
//       );
//     }

//     const milkRecords = await response.json();

//     return NextResponse.json(milkRecords, { status: 200 });

//   } catch (error) {
//     return NextResponse.json(
//       { error: 'An unexpected error occurred. ' + (error as Error).message },
//       { status: 500 }
//     );
//   }
// }