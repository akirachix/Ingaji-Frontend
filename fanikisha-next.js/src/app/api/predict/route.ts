import { NextRequest } from "next/server";
const baseUrl = process.env.BASE_URL;

export async function POST(request: NextRequest) {
    
        const requestData = await request.json();
        console.log('Received request data:', requestData);

        try{
            const response =await fetch(`${baseUrl}/api/predict/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(requestData),

            });
              
            console.log('Fetch response status:', response.status);
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("POST error response:", errorText);
                    return new Response(errorText, { status: response.status });
                }
        
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    status: 201,
                    statusText: 'Prediction Created Successfully',
                });
            } catch (error) {
                console.error('Fetch error:', error);
                return new Response((error as Error).message, { status: 500 });
            }




        }


