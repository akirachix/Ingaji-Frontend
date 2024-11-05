
"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

interface EligibilityResponse {
  qualifyingPoints: number | null;
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
  employment_duration: yup.number().required("Employment duration is required").min(0, "Cannot be less than 0").max(100, "Must be less than 100 years"),
  is_long_employment: yup.string().required("Employment type is required"),
});

const FarmerDetailsModal: React.FC<{ isOpen: boolean; onClose: () => void; farmerData?: Partial<FarmerFormData>; }> = ({ isOpen, onClose, farmerData }) => {
  const [eligibilityResult, setEligibilityResult] = useState<{ isEligible: boolean; qualifyingPoints: number | string; } | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<FarmerFormData>({
    resolver: yupResolver(schema),
    defaultValues: farmerData,
  });

  const transformFormData = (data: FarmerFormData) => {
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

  const onSubmit = async (data: FarmerFormData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const transformedData = transformFormData(data);
      console.log('Sending data:', JSON.stringify(transformedData, null, 2));

      const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const result: EligibilityResponse = await response.json();
      console.log('API Response:', result);

      const qualifyingPoints = result.qualifyingPoints;
      const isEligible = qualifyingPoints !== null && qualifyingPoints >= 50;

      setEligibilityResult({
        isEligible,
        qualifyingPoints: qualifyingPoints !== null ? qualifyingPoints : "No points returned",
      });
      setShowResultModal(true);

    } catch (error) {
      console.error('Error in form submission:', error);
      setApiError(error instanceof Error ? error.message : 'An error occurred while checking eligibility');
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'An error occurred while checking eligibility',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setEligibilityResult(null);
  };

  const handleClose = () => {
    reset();
    setApiError(null);
    setEligibilityResult(null);
    setShowResultModal(false);
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

        {showResultModal && eligibilityResult && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Eligibility Result</h3>
              <div className={`p-4 rounded-lg mb-4 ${
                eligibilityResult.isEligible 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                <p className="text-md font-medium">
                  {eligibilityResult.isEligible
                    ? "The farmer is eligible for the loan!"
                    : "The farmer is not eligible for the loan at this time."}
                </p>
                <p className="mt-2 text-sm">
                  Qualifying Points: <strong>{eligibilityResult.qualifyingPoints}</strong>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeResultModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Numeric Input Fields */}
            {[
              { name: 'total_income', label: 'Total Income (KES)', type: 'number' },
              { name: 'age', label: 'Age', type: 'number' },
              { name: 'num_children', label: 'Number of Children', type: 'number' },
              { name: 'total_dependents', label: 'Total Dependents', type: 'number' },
              { name: 'number_of_family_members', label: 'Number of Family Members', type: 'number' },
              { name: 'employment_duration', label: 'Employment Duration (Years)', type: 'number', step: '0.1' }
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

            {/* Select Fields */}
            {[
              { name: 'education_type', label: 'Education Level', options: ['', 'Primary', 'Secondary', 'Tertiary'] },
              { name: 'owns_car', label: 'Car Ownership', options: ['', 'Yes', 'No'] },
              { name: 'owns_property', label: 'Property Ownership', options: ['', 'Yes', 'No'] },
              { name: 'family_status', label: 'Family Status', options: ['', 'Single', 'Married', 'Divorced'] },
              { name: 'housing_type', label: 'Housing Type', options: ['', 'Rented', 'Owned'] },
              { name: 'is_long_employment', label: 'Long-term Employment', options: ['', 'Yes', 'No'] }
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
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Check Eligibility'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerDetailsModal;


