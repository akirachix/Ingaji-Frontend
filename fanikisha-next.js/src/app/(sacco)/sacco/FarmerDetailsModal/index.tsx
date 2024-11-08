
"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEligibility } from '@/app/hooks/useEligibility';

interface FarmerFormData {
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

const schema = yup.object().shape({
  total_income: yup.number().required("Total income is required").positive("Must be a positive number"),
  age: yup.number().required("Age is required").positive().integer(),
  education_type: yup.string().required("Education is required"),
  owns_car: yup.string().required("Car ownership is required"),
  owns_property: yup.string().required("Property ownership is required"),
  num_children: yup.number().required("Number of children is required").min(0, "Cannot be less than 0"),
  number_of_family_members: yup.number().required("Number of family members is required").positive().integer(),
  total_dependents: yup.number().required("Total dependents is required").min(0),
  family_status: yup.string().required("Family status is required"),
  housing_type: yup.string().required("Housing type is required"),
  employment_duration: yup.number().required("Employment duration is required").min(0, "Cannot be less than 100 years"),
  is_long_employment: yup.string().required("Employment type is required"),
});

const FarmerDetailsModal: React.FC<{ isOpen: boolean; onClose: () => void; farmerData?: Partial<FarmerFormData>; }> = ({ isOpen, onClose, farmerData }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FarmerFormData>({
    resolver: yupResolver(schema),
    defaultValues: farmerData,
  });

  const { eligibilityResult, apiError, isSubmitting, checkEligibility } = useEligibility();
  const [showEligibilityResult, setShowEligibilityResult] = useState(false);

  const onSubmit = async (data: FarmerFormData) => {
    await checkEligibility(data);
    setShowEligibilityResult(true);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center overflow-y-auto">
      <div className="bg-white rounded-lg p-6 md:p-8 max-w-lg w-full shadow-lg my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Farmer Details</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { name: 'total_income', label: 'Total Income (KES)', type: 'number' },
              { name: 'age', label: 'Age', type: 'number' },
              { name: 'num_children', label: 'Number of Children', type: 'number' },
              { name: 'total_dependents', label: 'Total Dependents', type: 'number' },
              { name: 'number_of_family_members', label: 'Number of Family Members', type: 'number' },
              { name: 'employment_duration', label: 'Years of farming experience', type: 'number', step: '0.1' }
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  {...register(field.name as keyof FarmerFormData)}
                  type={field.type}
                  step={field.step}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[field.name as keyof FarmerFormData] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name as keyof FarmerFormData]?.message}</p>
                )}
              </div>
            ))}

            {[
              { name: 'education_type', label: 'Education Level', options: ['', 'Primary', 'Secondary', 'Tertiary'] },
              { name: 'owns_car', label: 'Car Ownership', options: ['', 'Yes', 'No'] },
              { name: 'owns_property', label: 'Property Ownership', options: ['', 'Yes', 'No'] },
              { name: 'family_status', label: 'Family Status', options: ['', 'Single', 'Married', 'Divorced'] },
              { name: 'housing_type', label: 'Housing Type', options: ['', 'Rented', 'Owned'] },
              { name: 'is_long_employment', label: 'Consistent Farming', options: ['', 'Yes', 'No'] }
            ].map(selectField => (
              <div key={selectField.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{selectField.label}</label>
                <select
                  {...register(selectField.name as keyof FarmerFormData)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectField.options.map(option => (
                    <option key={option} value={option}>{option || 'Select'}</option>
                  ))}
                </select>
                {errors[selectField.name as keyof FarmerFormData] && (
                  <p className="text-red-500 text-sm mt-1">{errors[selectField.name as keyof FarmerFormData]?.message}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Check Eligibility'}
            </button>
          </div>
        </form>

        {showEligibilityResult && eligibilityResult && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-60">
            <div className="bg-white rounded-lg p-6 md:p-8 max-w-sm w-full shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Eligibility Result</h3>
              <p className="text-md font-medium">
                {eligibilityResult.eligibility === "Eligible"
                  ? "The farmer is eligible for the loan!"
                  : "The farmer is not eligible for the loan at this time."}
              </p>
              <p className="mt-2 text-sm">
                Prediction: <strong>{eligibilityResult.prediction[0]}</strong>
              </p>
              <p className="mt-2 text-sm">
                Date Checked: <strong>{eligibilityResult.current_date}</strong>
              </p>
              <button
                onClick={() => setShowEligibilityResult(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDetailsModal;
