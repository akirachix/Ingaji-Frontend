export const fetchFarmers = async () => {
  try {
    const response = await fetch('/api/farmers');
    if (!response.ok) {
      throw new Error('Failed to fetch farmers'+ response.text());
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};