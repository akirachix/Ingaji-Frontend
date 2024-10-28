const baseUrl = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}/api/milk-records/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GET error response:", errorText);
      return new Response(errorText, {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'Fetched Successfully',
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}


export async function POST(request: Request) {
  try {
    const record = await request.json();
    const response = await fetch(`${baseUrl}/api/milk-records/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("POST error response:", errorText);
      return new Response(errorText, {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 201,
      statusText: 'Created Successfully',
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}


export async function PUT(request: Request) {
  try {
    const record = await request.json();
    const response = await fetch(`${baseUrl}/api/milk-records/${record.record_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("PUT error response:", errorText);
      return new Response(errorText, {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'Updated Successfully',
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}