export interface Farmers{
    cooperative_name: string;
    is_eligible: boolean;
    farmer_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    created_at : string;
    cooperative_number: number;
    sacco_name: string;
  
}

export const fetchFarmers = async () =>{
    try{
        const response = await fetch('/api/farmers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

    if (!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);

    }
    return await response.json();

 }  catch (error){
    throw new Error('Failed to fetch data')
 }
};