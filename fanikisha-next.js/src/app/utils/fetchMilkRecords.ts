export const fetchMilkRecords = async () => {
  try {
    const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error); 
    throw new Error('Failed to fetch data');
  }
}