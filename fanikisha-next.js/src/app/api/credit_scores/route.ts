

import { NextResponse } from 'next/server';
const baseURL = process.env.BASE_URL;
export async function GET() {
  

  try {
    const response = await fetch(`${baseURL}/api/farmers`);
    
    if (!response.ok) {
      const textResponse = await response.text();
      console.error('GET error response:', textResponse);
      return NextResponse.json(
        { error: textResponse || 'Failed to fetch credit scores' },
        { status: response.status }
      );
    }

    const farmers = await response.json();
    return NextResponse.json(farmers, { status: 200 });

  } catch (error) {
    console.error('Error fetching credit scores:');
    return NextResponse.json(
      { error: 'An unexpected error occurred: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

