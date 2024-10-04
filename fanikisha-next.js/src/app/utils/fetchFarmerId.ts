 import { MilkRecord } from "./types";
const baseUrl = '/api/milk-records/';
export const fetchFarmersId = async (id: number): Promise<MilkRecord[]> => {
    try {
        const response = await fetch(`${baseUrl}${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch milk records');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching milk records:', error);
        throw error;
    }
};