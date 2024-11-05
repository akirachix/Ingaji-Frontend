import { useState } from 'react';
import { transformFormData } from '../utils/formUtilis';
import { FarmerFormData } from '../utils/types';

export const useEligibility = () => {
  const [eligibilityResult, setEligibilityResult] = useState<{ isEligible: boolean; qualifyingPoints: number | string; } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkEligibility = async (data: FarmerFormData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      const transformedData = transformFormData(data);
      const response = await fetch('/api/predict/', {
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
      const qualifyingPoints = result.qualifyingPoints;
      const isEligible = qualifyingPoints !== null && qualifyingPoints >= 50;
      setEligibilityResult({
        isEligible,
        qualifyingPoints: qualifyingPoints !== null ? qualifyingPoints : "No points returned",
      });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'An error occurred while checking eligibility');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { eligibilityResult, apiError, isSubmitting, checkEligibility };
};
