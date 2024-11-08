import { useState } from 'react';
import { transformFormData } from '../utils/formUtilis';
import { FarmerFormData } from '../utils/types';

export const useEligibility = () => {
  const [eligibilityResult, setEligibilityResult] = useState<{
    isEligible: boolean;  
    prediction: number[];
    eligibility: string;
    current_date: string;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkEligibility = async (data: FarmerFormData) => {
    setIsSubmitting(true);
    setApiError(null);

    try {
      const transformedData = transformFormData(data);
      const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      setEligibilityResult({
        isEligible: result.eligibility === "Eligible",  
        prediction: result.prediction,
        eligibility: result.eligibility,
        current_date: result.current_date,
      });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'An error occurred while checking eligibility');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { eligibilityResult, apiError, isSubmitting, checkEligibility };
};

