// export interface CreditScore {
//     credit_score_id: number;
//     score: number;
//     credit_worthiness: string;
//     loan_range: string;
//     last_checked_date: string;
//     is_eligible: boolean;
//   }
  
//   export const fetchCreditScores = async (): Promise<CreditScore[]> => {
//     try {
//       const response = await fetch(`/api/credit-scores/`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }
  
//       return await response.json();
  
//     } catch (error) {
//       const errorMessage = (error as Error).message || 'Failed to fetch credit scores';
//       throw new Error(errorMessage);
//     }
//   };
  



export interface CreditScore {
  credit_score_id: number;
  farmer_id: number;
  score: number;
  credit_worthiness: string;
  loan_range: string;
  last_checked_date: string;
  is_eligible: boolean;
}

export const fetchCreditScores = async (): Promise<CreditScore[]> => {
  try {
    const response = await fetch(`/api/credit_scores`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    const errorMessage = (error as Error).message || 'Failed to fetch credit scores';
    throw new Error(errorMessage);
  }
};
