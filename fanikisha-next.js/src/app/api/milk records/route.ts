import { MilkRecord } from "@/app/(sacco)/sacco/utils/types";

const API_BASE_URL = 'https://fanikisha-3beb7fcefffe.herokuapp.com';

export const fetchMilkRecords = async (): Promise<MilkRecord[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/milk-records/1/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: MilkRecord[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching milk records:', error);
    throw error;
  }
};
