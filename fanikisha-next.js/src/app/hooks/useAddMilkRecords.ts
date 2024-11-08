import { useState } from "react";

interface AddMilkRecordPayload {
  farmer_id: number;
  date: string;
  milk_quantity: number;
  price: number;
}

interface UseAddMilkRecordResult {
  isSubmitting: boolean;
  errorMessage: string | null;
  addMilkRecord: (payload: AddMilkRecordPayload) => Promise<void>;
}

export const useAddMilkRecord = (): UseAddMilkRecordResult => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addMilkRecord = async (payload: AddMilkRecordPayload) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `https://fanikisha-3beb7fcefffe.herokuapp.com/api/milk-records/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add milk record");
      }
    } catch (error) {
      setErrorMessage((error as Error).message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, errorMessage, addMilkRecord };
};
