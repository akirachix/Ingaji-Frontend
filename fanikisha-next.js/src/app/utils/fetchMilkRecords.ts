import { MilkRecord, MilkRecordsResponse } from './types'; 

const baseUrl = process.env.BASE_URL;


async function fetchMilkRecords(): Promise<MilkRecordsResponse> {
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

async function fetchMilkRecordByFarmerId(farmer_id: number): Promise<MilkRecord> {
  try {
    const response = await fetch(`https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records/${farmer_id}`, {
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
    throw new Error('Failed to fetch data for the specific farmer');
  }
}

async function createMilkRecord(recordData: MilkRecord): Promise<MilkRecord> {
  try {
    const response = await fetch(`${baseUrl}/api/milk-records/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recordData),
    });

    if (!response.ok) {
      throw new Error(`Error creating record: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating milk record:", error);
    throw new Error("Failed to create milk record");
  }
}

async function updateMilkRecord(recordData: MilkRecord & { record_id: number }): Promise<MilkRecord> {
  try {
    const response = await fetch(`${baseUrl}/api/milk-records/${recordData.record_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recordData),
    });

    if (!response.ok) {
      throw new Error(`Error updating record: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating milk record:", error);
    throw new Error("Failed to update milk record");
  }
}

export { fetchMilkRecords, createMilkRecord, updateMilkRecord, fetchMilkRecordByFarmerId };
