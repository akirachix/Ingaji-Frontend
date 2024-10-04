const baseURL = process.env.BASE_URL;
export async function POST(request: Request) {

    const { username, password } = await request.json();
  
    if (!username || !password) {
      return new Response('Username and password are missing', {
        status: 400,
      });
    }
  
    try {
      const response = await fetch(`${baseURL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        return new Response(errorData || 'Login failed', {
          status: response.status,
        });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
      });
    } catch (error) {
      return new Response((error as Error).message || 'Internal server error', {
        status: 500,
      });
    }
  }
  
