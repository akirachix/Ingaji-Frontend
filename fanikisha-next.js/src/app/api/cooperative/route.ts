const baseUrl = process.env.BASE_URL;

export async function GET() {
try {
  const response = await fetch(`${baseUrl}/api/cooperative/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("GET error response:", errorText)
    return new Response(errorText,{
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