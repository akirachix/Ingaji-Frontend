// import { NextResponse } from 'next/server';
// const baseURL = process.env.BASE_URL;


// export async function GET() {
//   try {
//     const response = await fetch(`${baseURL}/api/milk-records/`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch farmer records');
//     }

//     const patients = await response.json();
//     return NextResponse.json(patients); 
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     return NextResponse.json({ error: 'Failed to fetch farmer records' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET(request: { url: string | URL; }) {
  try {
    const { searchParams } = new URL(request.url);
    const farmerId = searchParams.get('farmerId');

    const apiUrl = farmerId ? `${baseURL}/api/milk-records?farmerId=${farmerId}` : `${baseURL}/api/milk-records/`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch farmer records');
    }

    const records = await response.json();
    return NextResponse.json(records);
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json({ error: 'Failed to fetch farmer records' }, { status: 500 });
  }
}
