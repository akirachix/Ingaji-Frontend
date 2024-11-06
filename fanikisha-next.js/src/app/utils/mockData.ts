export const generateMockMilkRecords = (farmerId: string) => {
    const records = [];
    const today = new Date();
    
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      records.push({
        record_id: i + 1,
        farmer_id: Number(farmerId),
        milk_quantity: Math.floor(Math.random() * 50) + 10,
        price: Math.floor(Math.random() * 100) + 50,
        date: date.toISOString().split('T')[0]
      });
    }
    
    return records;
  };