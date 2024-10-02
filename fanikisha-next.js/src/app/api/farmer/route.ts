// const baseUrl = process.env.BASE_URL;
// export async function GET() {
//   try {
//     const response = await fetch(`${baseUrl}/api/farmers/`, {
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


const baseUrl = process.env.BASE_URL;
export async function GET() {
  try {
    console.log('Fetching farmers from:', `${baseUrl}/api/farmers/`);
    const response = await fetch(`${baseUrl}/api/farmers/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Farmers API response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("GET error response:", errorText);
      return new Response(errorText, {
        status: response.status,
      });
    }
    const data = await response.json();
    console.log('Farmers data received:', data);
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'Fetched Successfully',
    });
  } catch (error) {
    console.error('Error in farmers API route:', error);
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}