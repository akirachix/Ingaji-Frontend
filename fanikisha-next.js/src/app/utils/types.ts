export interface Farmer {
    id: number;
    date_registered: string;
  }

  export interface MilkRecord {
    id: number;
    farmer: number;
    date: string;
    quantity: number;
    price: number;
  }

  export interface CooperativeData {
    totalFarmers: number;
    activeFarmers: number;
    inactiveFarmers: number;
    registeredFarmersData: number[];
    milkProductionData: number[];
    totalPriceData: number[];
  }