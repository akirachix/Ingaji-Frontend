
import { FarmerFormData } from './types';

export const transformFormData = (data: FarmerFormData) => {
  return {
    owns_car: data.owns_car.toLowerCase(),
    owns_property: data.owns_property.toLowerCase(),
    num_children: Number(data.num_children),
    total_income: Number(data.total_income),
    education_type: data.education_type,
    family_status: data.family_status,
    housing_type: data.housing_type,
    age: Number(data.age),
    employment_duration: Number(data.employment_duration),
    number_of_family_members: Number(data.number_of_family_members),
    total_dependents: Number(data.total_dependents),
    is_long_employment: data.is_long_employment.toLowerCase()
  };
};
