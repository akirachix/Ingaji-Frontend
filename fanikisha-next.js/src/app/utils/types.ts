import { Key, ReactNode } from "react";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface MilkRecord {
  record_id: number;
  farmer_id: number;
  first_name: string;
  last_name: string;
  farmer: number;
  date: string;
  milk_quantity: number;
  price: number;
  total_value: number;
  total_milk_value: number;
}

export interface MilkRecordsResponse {
  data: MilkRecord[];
  records: MilkRecord[];
  total: number; 
}

export interface Farmer {
  farmer_id: number; 
  id: number;
  date_registered: string;
}

export interface CooperativeData {
  totalFarmers: number;
  activeFarmers: number;
  inactiveFarmers: number;
  registeredFarmersData: number[];
  milkProductionData: number[];
  totalPriceData: number[];
}

export interface Farmer {
  first_name: string;
  last_name: string;
  cooperative_number: string;
  phone_number: string;
  created_at: string;
}

export interface NewFarmer {
  first_name: string;
  last_name: string;
  phone_number: string;
  cooperative_id: string;
  sacco_id: number;
}

export interface Cooperative {
  cooperative_id: number; 
  cooperative_name: string;
  user: number;
}

export interface Sacco {
  sacco_id: number; 
  sacco_name: string;
}

export interface CooperativesAndSaccos {
  cooperatives: Cooperative[];
  saccos: Sacco[];
}

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResult {
  isSubmitting: boolean;
  errorMessage: string;
  successMessage: string;
  login: (loginData: LoginData) => Promise<userData>; 
}

export interface CreditScore {
  credit_score_id: number;
  farmer_id: number;
  score: number;
  credit_worthiness: string;
  loan_range: number;
  last_checked_date: string;
  is_eligible: boolean;
}

export interface MilkRecord {
  record_id: number;
  first_name: string;
  last_name: string;
  milk_quantity: number;
  price: number;
  date: string;
}

// export interface EligibilityData {
//   totalIncome: number;
//   daysEmployed: number;
//   education: 'None' | 'Primary' | 'Secondary' | 'Tertiary'; 
//   housingType: 'Owned' | 'Rented'; 
// }

// export interface FarmerFormData {
//   owns_car: string;
//   owns_property: string;
//   num_children: number;
//   total_income: number;
//   education_type: string;
//   family_status: string;
//   housing_type: string;
//   age: number;
//   employment_duration: number;
//   number_of_family_members: number;
//   total_dependents: number;  
//   is_long_employment: string;
// }

// export interface FormInputData {
//   owns_car: string;
//   owns_property: string;
//   num_children: number;
//   total_income: number;
//   education_type: string;
//   family_status: string;
//   housing_type: string;
//   age: number;
//   employment_duration: number;
//   number_of_family_members: number;
//   total_dependents: number; 
//   is_long_employment: string;
// }
export interface FarmerFormData {
  owns_car: string;
  owns_property: string;
  num_children: number;
  total_income: number;
  education_type: string;
  family_status: string;
  housing_type: string;
  age: number;
  employment_duration: number;
  number_of_family_members: number;
  total_dependents: number;
  is_long_employment: string;
}

export interface EligibilityResponse {
  prediction: number[];
  eligibility: string;
  current_date: string;
}





export interface Farmers {
  cooperative_name: string;
  is_eligible: boolean;
  farmer_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  created_at: string;
  cooperative_number: number;
  sacco_name: string;
}

export interface Cooperative {
  cooperative_id: number;
  cooperative_name: string;
}

export interface userData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  password: string;
}

export interface RegistrationErrorResponse {
  error: string;
  details?: {
    field?: string;
    message?: string;
  };
}

export interface RegistrationSuccessResponse {
  message: string;
  users: userData[];
}

export interface FarmerData {
  is_eligible: string;
  status: string;
  score: string;
  last_checked_date: string;
  last_name: ReactNode;
  first_name: ReactNode;
  farmer_id: Key | null | undefined;
  count: number;
  farmers: Array<{
    farmer_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    cooperative_number: string;
    sacco_id: number;
    cooperative_id: number;
    created_at: string;
  }>;
}

export interface CooperativeWithFarmers {
  cooperative_id: number;     
  cooperative_name: string;     
  number_of_farmers: number;   
}

export interface CombinedFarmerData {
  name: string;
  cooperativeNo: string;
  last_checked_date: string;
  is_eligible: boolean;
}

export interface MilkRecordData {
  farmerId: number;
  farmer: number;
  date: string;
  quantity: number;
  price: number;
}

export interface Farmer {
  id: number;
  name: string;
}

export interface CooperativeDetails {
  id: number;
  name: string;
  farmers: Farmer[];
  creditScores: CreditScore[];
}




 