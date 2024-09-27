const baseURL = process.env.BASE_URL;

export async function POST(request: Request) {
  const requestData = await request.json();
  console.log("Received data:", requestData);
  try {
    const response = await fetch(`${baseURL}/api/farmers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("POST error response:", errorData);
      return new Response(JSON.stringify(errorData), {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 201,
    });
  } catch (error) {
    const errors = (error as Error).message;
    console.error("Error during POST request:", { errors });
    return new Response(errors, {
      status: 500,
    });
  }
}

export async function GET() {
  const response = await fetch(`${baseURL}/api/farmers`);
  console.log({response});
  
  console.log("do we get here");

  if (!response.ok) {
    const errorData = await response.text();
    console.error("GET error response:", errorData);
    return new Response(errorData, {
      status: response.status,
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
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
