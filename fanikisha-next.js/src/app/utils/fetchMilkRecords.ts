export interface MilkRecord {
  record_id: number;
  farmer_id: number;
  milk_quantity: number;
  price: number;
  date: string;
}

export const fetchMilkRecords = async () => {
  try {
    const response = await fetch('/api/milk_records');
    if (!response.ok) {
      throw new Error('Failed to fetch milk records: ' + (await response.text()));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchMilkRecord = async (id: number) => {
  try {
    const response = await fetch(`/api/milk_records/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch milk record: ' + (await response.text()));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

