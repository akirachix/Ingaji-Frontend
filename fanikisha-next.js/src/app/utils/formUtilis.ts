
export const transformFormData = (data: any) => {
  return {
    owns_car: data.owns_car === 'Yes' ? 1 : 0,
    owns_property: data.owns_property === 'Yes' ? 1 : 0,
    num_children: Number(data.num_children),
    total_income: Number(data.total_income),
    education_type: data.education_type === 'Primary' ? 0 : data.education_type === 'Secondary' ? 1 : 2,
    family_status: data.family_status === 'Single' ? 0 : data.family_status === 'Married' ? 1 : 2,
    housing_type: data.housing_type === 'Owned' ? 1 : 0,
    age: Number(data.age),
    employment_duration: Number(data.employment_duration),
    number_of_family_members: Number(data.number_of_family_members),
    total_dependents: Number(data.total_dependents),
    is_long_employment: data.is_long_employment === 'Yes' ? 1 : 0,
  };
};
