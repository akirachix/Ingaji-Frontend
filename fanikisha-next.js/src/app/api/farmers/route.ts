const baseURL = process.env.BASE_URL;

// if (!baseURL) {
//     console.error('Error: BASE_URL is not defined in the environment variables.');
// }

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
  //   try {
  //     console.log({ baseURL });

  //     const response = await fetch(`${baseURL}/api/farmers`);
  //     console.log("do we get here");

  //     if (!response.ok) {
  //       const errorData = await response.text();
  //       console.error("GET error response:", errorData);
  //       return new Response(errorData, {
  //         status: response.status,
  //       });
  //     }

  //     const data = await response.json();
  //     return new Response(JSON.stringify(data), {
  //       status: 200,
  //     });
  //   } catch (error) {
  //     const errors = (error as Error).message;
  //     console.error("Error during GET request:", { errors });
  //     return new Response(errors, {
  //       status: 500,
  //     });
  //   }
}
