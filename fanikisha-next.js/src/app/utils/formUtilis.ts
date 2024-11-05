// utils/formUtilis.ts
import { FarmerFormData, FormInputData } from './types';

export const transformFormData = (data: FarmerFormData): FormInputData => {
  return {
    owns_car: data.owns_car,
    owns_property: data.owns_property,
    num_children: data.num_children,
    total_income: data.total_income,
    education_type: data.education_type,
    family_status: data.family_status,
    housing_type: data.housing_type,
    age: data.age,
    employment_duration: data.employment_duration,
    number_of_family_members: data.number_of_family_members,
    total_dependents: data.total_dependents, 
    is_long_employment: data.is_long_employment,
  };
};
