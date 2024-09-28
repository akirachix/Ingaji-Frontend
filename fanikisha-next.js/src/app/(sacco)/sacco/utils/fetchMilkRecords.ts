
export const fetchMilkRecords = async () =>{
  try{
      const response = await fetch('/api/milk_records', {
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

