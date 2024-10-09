// const baseUrl = process.env.BASE_URL;
// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   const { id } = params;
//   console.log({baseUrl});
//   if (!id) {
//     return new Response('farmer record not found', {
//       status: 500,
//     });
//   }
//   try {
//     const res = await fetch(`${baseUrl}/api/milk-records/{id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     console.log('Fetch Response:', res);
//     if (!res.ok) {
//       return new Response(`Error: ${res.statusText}`, {
//         status: res.status,
//       });
//     }
//     const farmerData = await res.json();
//     return new Response(JSON.stringify(farmerData), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error('Error fetching farmer data:', error);
//     return new Response((error as Error).message, {
//       status: 500,
//     });
//   }
// }



const baseUrl = process.env.BASE_URL;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log({ baseUrl });

  // Check if the id is present in the params
  if (!id) {
    return new Response('Farmer record not found', {
      status: 404, // Changed to 404 for better semantics
    });
  }

  try {
    // Use template literals to correctly embed the id in the URL
    const res = await fetch(`${baseUrl}/api/milk-records/${id}`, { // Fixed by changing `{id}` to `${id}`
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Fetch Response:', res);

    // Check if the response is ok
    if (!res.ok) {
      return new Response(`Error: ${res.statusText}`, {
        status: res.status,
      });
    }

    // Parse the response JSON
    const farmerData = await res.json();

    // Return the farmer data as a JSON response
    return new Response(JSON.stringify(farmerData), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching farmer data:', error);

    // Return a generic error message
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
