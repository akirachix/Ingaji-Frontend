import { NextRequest, NextResponse } from 'next/server';
export async function GET() {
  const baseUrl = process.env.BASE_URL;

  try {
    const response = await fetch(`${baseUrl}/api/farmers/`);
    
    if (!response.ok) {
      const textResponse = await response.text();
      console.log('response:', textResponse, 'Status:', response.status);
      
      return NextResponse.json(
        { error: textResponse || 'Failed to fetch farmers' },
        { status: response.status }
      );
    }
    const farmers = await response.json();

    return NextResponse.json(farmers, { status: 200 });

  } catch (error) {
    console.error('Error fetching farmers:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. ' + (error as Error).message },

      { status: 500 }
    );
  }
}