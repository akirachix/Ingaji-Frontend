const baseUrl = process.env.BASE_URL;
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log({baseUrl});
  if (!id) {
    return new Response('farmer record not found', {
      status: 500,
    });
  }
  try {
    const res = await fetch(`${baseUrl}/api/milk-records/{id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Fetch Response:', res);
    if (!res.ok) {
      return new Response(`Error: ${res.statusText}`, {
        status: res.status,
      });
    }
    const farmerData = await res.json();
    return new Response(JSON.stringify(farmerData), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching farmer data:', error);
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}