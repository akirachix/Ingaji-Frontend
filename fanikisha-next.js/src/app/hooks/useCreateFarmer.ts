import { useState } from "react";
import { NewFarmer } from "../../../utils/types";

export const useCreateFarmer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitFarmer = async (farmer: NewFarmer) => {
    setIsSubmitting(true);
    console.log("Submitting farmer data:", farmer);
    try {
      const response = await fetch(
        "https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers/",
        {
          method: "POST",
          body: JSON.stringify(farmer),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Error response:", errorResponse);
        throw new Error(`Failed to submit farmer: ${errorResponse}`);
      }

      const data = await response.json();
      console.log("Farmer submitted successfully:", data);
      return data;
    } catch (error) {
      console.error("Failed to submit farmer:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitFarmer, isSubmitting };
};
