
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
      console.log('Login request failed:', errorData);
      return new Response(errorData || 'Login failed', {
        status: response.status,
      });
    }

    const data = await response.json();
    console.log('Login successful, backend response:', data);

    
    const { role, ...otherData } = data;
    console.log('Extracted role:', role);
    return new Response(JSON.stringify({ 
      ...otherData, 
      role 
    }), {
      status: 200,
    });

  } catch (error) {
    console.log('Error during login:', (error as Error).message);
    return new Response((error as Error).message || 'Internal server error', {
      status: 500,
    });
  }
}

    
  
  
  
  
  
  
  
  
  
  
  