export const fetchMilkRecords = async () => {
    try {
      const response = await fetch('/api/milkRecords');
      if (!response.ok) {
        throw new Error('Failed to fetch milk records'+ response.text());
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };