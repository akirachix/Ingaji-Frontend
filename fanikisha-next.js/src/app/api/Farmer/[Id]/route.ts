import { fetchMilkRecords } from '@/app/utils/fetchMilkRecords';
import { MilkRecord } from '@/app/utils/types';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return new Response('Farmer record not found', { status: 400 });
    }

    try {
        const milkRecord: MilkRecord = await fetchMilkRecords(parseInt(id)); 

        return new Response(JSON.stringify(milkRecord), { status: 200 });
    } catch (error) {
        console.error('Error fetching farmer data:', error);
        return new Response((error as Error).message, { status: 500 });
    }
}


