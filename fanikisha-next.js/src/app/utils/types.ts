export interface LoginCredentials {
    username: string;
    password: string;
  }

  export interface MilkRecord {
    first_name : string;
    last_name : string;
    milk_quantity: number;
    price: number;
    total_value: number;
  }


  
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
