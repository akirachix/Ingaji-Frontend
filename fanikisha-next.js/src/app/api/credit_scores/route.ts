// CREATING AN API TO CALL AN EXTERNAL API

export async function GET() {
    const baseUrl = process.env.BASE_URL;



    // FETCHING DATA FROM API
    try {
        const response = await fetch(`${baseUrl}/api/credit-scores/`, {
            method: 'GET', // Use 'GET' for fetching data
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        return new Response(JSON.stringify(result), {
            status: 200,
            // statusText: "Fetch successful",
        });

    } catch (error) {
        console.log({errors:(error as Error).message});
        

        return new Response((error as Error).message, {
            status: 500,
        });
    }
}

// TypeScript interface for CreditScore
export interface CreditScore {
    credit_score_id: number;
    score: number;
    credit_worthiness: string;
    loan_range: string;
    last_checked_date: string;
    is_eligible: boolean;
    farmer_id: number;
}
