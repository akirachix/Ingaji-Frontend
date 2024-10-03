export const displayFarmers = async (endpoint: string, options = {}) => {
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
      }
      throw new Error('Failed to fetch data'); 
    }
  };
  