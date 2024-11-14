
import { useState } from 'react';
import { FarmerFormData,EligibilityResponse } from '../utils/types';
import { transformFormData } from '../utils/formUtilis';

export const useEligibility = () => {
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkEligibility = async (data: FarmerFormData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const requestData = transformFormData(data);
      console.log('Sending data:', requestData);

      const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      setEligibilityResult(result);
    } catch (error) {
      console.error('API Error:', error);
      setApiError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { eligibilityResult, apiError, isSubmitting, checkEligibility };
};