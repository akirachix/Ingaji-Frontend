
  


export const fetchCreditScore = async () => {
    try {
        const response = await fetch('/api/loan_eligibility', {
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
