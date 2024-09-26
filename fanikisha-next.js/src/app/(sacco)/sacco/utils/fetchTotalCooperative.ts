export interface Cooperative{
    cooperative_id: number;
    cooperative_name: string;
    user: string;
}
export const fetchTotalCooperative = async () =>{
    try{
        const response = await fetch('/api/cooperative', {
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





