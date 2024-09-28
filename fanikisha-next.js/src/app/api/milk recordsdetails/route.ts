// import { MilkRecord } from "@/app/(sacco)/sacco/utils/types";

import { MilkRecord } from "@/app/(sacco)/sacco/utils/types";
import { NextResponse } from 'next/server';
import { fetchMilkRecords } from '@/app/(sacco)/sacco/utils/fetchMilkRecords'; // Adjust the import path if necessary

const API_BASE_URL = 'https://fanikisha-3beb7fcefffe.herokuapp.com';


    
export async function GET() { 
  try {
    const response = await fetch(`${API_BASE_URL}/api/milk-records/1/`);
    if (!response.ok) {
      return NextResponse.json({ error: `HTTP error! status: ${response.status}` }, { status: response.status });
    }
    const data: MilkRecord[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching milk records:', error);
    return NextResponse.json({ error: 'Error fetching milk records' }, { status: 500 });
  }
}
