
const url = '/api/signup/'

export const userSignup = async (userData: { first_name: string; last_name: string; username: string; email: string; role:string; password: string; }) => {
  try {
    if (!url) {
      throw new Error('Base URL not set.');
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.text();
      return { error: error || response.statusText || `Error ${response.status}: ${response.statusText}` };
    }
    const result = await response.json();
    return { data: result };
  } catch (error) {
    const message = (error instanceof Error) ? error.message : 'An unexpected error occurred. Please try again later.';
    return { error: message };
  }
};