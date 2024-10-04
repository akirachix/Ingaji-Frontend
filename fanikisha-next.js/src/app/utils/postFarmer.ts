import { Farmer } from "./types";

const url = '/api/farmers';

export const postFarmer = async (farmerData: Farmer) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(farmerData),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw new Error('Failed to post data');
    }
};
