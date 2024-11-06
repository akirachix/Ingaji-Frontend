// // app/api/check-eligibility/route.ts
// export async function POST(request: Request) {
//     try {
//       const data = await request.json();
      
//       const mockResponse: EligibilityResponse = {
//         userId: Math.random().toString(36).substr(2, 9),
//         isEligible: true,
//         creditScore: {
//           score: Math.floor(Math.random() * (850 - 300) + 300),
//           creditWorthiness: "good",
//           loanRange: "50000-100000",
//           lastCheckedDate: new Date().toISOString()
//         }
//       };
  
//       return new Response(JSON.stringify(mockResponse), {
//         headers: { 'Content-Type': 'application/json' },
//         status: 200
//       });
//     } catch (error) {
//       return new Response(JSON.stringify({ error: 'Failed to process request' }), {
//         headers: { 'Content-Type': 'application/json' },
//         status: 500
//       });
//     }
// }


// app/api/check-eligibility/route.ts (for Next.js 13+ with App Router)
// or pages/api/check-eligibility.ts (for Next.js with Page Router)
import type { NextApiRequest, NextApiResponse } from 'next';

interface EligibilityResponse {
  prediction: boolean;
  probability: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate request body (ensure all required fields are present)
    const {
      totalIncome,
      age,
      education,
      carOwnership,
      numberOfChildren,
      totalIncome2,
      gender,
      familyMembers,
      familyStatus,
      housingType,
      yearsEmployed,
      occupationType,
    } = req.body;

    // Ensure all required fields are provided and valid
    if (
      totalIncome === undefined ||
      age === undefined ||
      education === undefined ||
      carOwnership === undefined ||
      numberOfChildren === undefined ||
      totalIncome2 === undefined ||
      gender === undefined ||
      familyMembers === undefined ||
      familyStatus === undefined ||
      housingType === undefined ||
      yearsEmployed === undefined ||
      occupationType === undefined
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Prepare the transformed data for the external API
    const transformedData = {
      ...req.body,
      carOwnership: carOwnership === 'Yes' ? 1 : 0,
      education: education === 'Primary' ? 0 : education === 'Secondary' ? 1 : 2,
      gender: gender === 'Male' ? 1 : 0,
      familyStatus: familyStatus === 'Single' ? 0 : familyStatus === 'Married' ? 1 : 2,
      housingType: housingType === 'Owned' ? 1 : 0,
      occupationType: occupationType === 'Farmer' ? 1 : 0,
    };

    // Send the transformed data to the external API
    const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/predict/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('External API error:', errorText);
      return res.status(500).json({ message: 'Error processing eligibility check' });
    }

    const result: EligibilityResponse = await response.json();

    // Return the result from the external API
    res.status(200).json(result);
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
