
export async function GET() {
    const baseUrl = process.env.BASE_URL;


    try {
        const response = await fetch(`${baseUrl}/api/milk-records/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        return new Response(JSON.stringify(result), {
            status: 200,
        });

    } catch (error) {
        return new Response((error as Error).message, {
            status: 500,
        });
    }
}
