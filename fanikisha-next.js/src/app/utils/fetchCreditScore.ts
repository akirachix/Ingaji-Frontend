
export interface CreditScore {
  credit_score_id: number;
  farmer_id: number;
  score: number;
  credit_worthiness: string;
  loan_range: string;
  last_checked_date: string;
  is_eligible: boolean;
}


export const fetchCreditScore = async () => {
    try {
        const response = await fetch('/api/credit-score', {
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
        console.error('Failed to fetch credit score data:', error); 
        throw new Error('Failed to fetch data');
    }
};

  

