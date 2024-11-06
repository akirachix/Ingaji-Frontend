// const baseUrl = process.env.BASE_URL;
// export async function GET() {
//   try {
//     const response = await fetch(`${baseUrl}/api/milk-records/`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("GET error response:", errorText)
//       return new Response(errorText,{
//         status: response.status,
//       });
//     }
//     const data = await response.json();
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       statusText: 'Fetched Successfully',
//     });
//   } catch (error) {
//     return new Response((error as Error).message, {
//       status: 500,
//     });
//   }
// }



import { useMilkRecord } from '@/app/hooks/useMilkRecord';
import { NextRequest, NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  console.log("Received data:", requestData);

  try {
    const response = await fetch(`${baseURL}/api/milk-records/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("POST error response:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error during POST request:", error);
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/milk-records/`);
    
    if (!response.ok) {
      const textResponse = await response.text();
      console.error('GET error response:', textResponse);
      return NextResponse.json(
        { error: textResponse || 'Failed to fetch farmers' },
        { status: response.status }
      );
    }

    const farmers = await response.json();
    return NextResponse.json(useMilkRecord, { status: 200 });

  } catch (error) {
    console.error('Error fetching farmers:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
