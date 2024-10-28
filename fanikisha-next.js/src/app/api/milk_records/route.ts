// const baseUrl = process.env.BASE_URL;
// export async function GET() {
//   try {
//     const response = await fetch(`${baseUrl}/api/milk-records/`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("GET error response:", errorText)
//       return new Response(errorText,{
//         status: response.status,
//       });
//     }
//     const data = await response.json();
//     return new Response(JSON.stringify(data), {
//       status: 200,
//       statusText: 'Fetched Successfully',
//     });
//   } catch (error) {
//     return new Response((error as Error).message, {
//       status: 500,
//     });
//   }
// }



// api/milk-records/route.ts
const baseUrl = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseUrl}/api/milk-records/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GET error response:", errorText);
      return new Response(errorText, {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      statusText: 'Fetched Successfully',
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${baseUrl}/api/milk-records/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("POST error response:", errorText);
      return new Response(errorText, {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 201,
      statusText: 'Created Successfully',
    });
  } catch (error) {
    return new Response((error as Error).message, {
      status: 500,
    });
  }
}

// hooks/useMilkRecord.ts
import { useState, useEffect } from 'react';
import { MilkRecord } from '@/app/utils/types';

export function useMilkRecord() {
  const [data, setData] = useState<MilkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/milk-records');
      if (!response.ok) throw new Error('Failed to fetch records');
      const records = await response.json();
      setData(records);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (record: Omit<MilkRecord, 'record_id'>) => {
    try {
      const response = await fetch('/api/milk-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) throw new Error('Failed to add record');
      const newRecord = await response.json();
      setData(prev => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return { data, loading, error, fetchRecords, addRecord };
}

// Updated handleSubmit function in CombinedMilkRecordsPage
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const updatedRecord = {
      ...newCollection,
      first_name: selectedFarmer?.first_name || "",
      last_name: selectedFarmer?.last_name || "",
      is_collection: true
    };

    if (editingRecord) {
      // Handle update logic
      const response = await fetch(`/api/milk-records/${editingRecord.record_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) throw new Error('Failed to update record');
      const updated = await response.json();
      
      setRecords(prev => prev.map((record: { record_id: any; }) =>
        record.record_id === editingRecord.record_id ? updated : record
      ));
      
      const updateEvent = new CustomEvent('milkRecordUpdated', {
        detail: { type: 'update', record: updated }
      });
      window.dispatchEvent(updateEvent);
    } else {
      // Add new record
      const response = await fetch('/api/milk-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) throw new Error('Failed to add record');
      const newRecord = await response.json();
      
      setRecords(prev => [...prev, newRecord]);
      
      const addEvent = new CustomEvent('milkRecordUpdated', {
        detail: { type: 'add', record: newRecord }
      });
      window.dispatchEvent(addEvent);
    }

    resetForm();
  } catch (error) {
    console.error('Error handling milk record:', error);
    // Handle error appropriately (show error message to user)
  }
};

function setRecords(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}
function resetForm() {
  throw new Error('Function not implemented.');
}

