import { EligibilityData } from '@/app/utils/types';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
  
    const eligibilityScore = calculateEligibilityScore(data);
    
    const userId = Math.floor(Math.random() * 10000).toString();
    
    const creditScore = {
      score: eligibilityScore,
      creditWorthiness: getCreditWorthiness(eligibilityScore),
      loanRange: getLoanRange(eligibilityScore),
      lastCheckedDate: new Date().toISOString()
    };

    return NextResponse.json({
      userId,
      isEligible: eligibilityScore >= 600,
      creditScore
    });
  } catch (error) {
    console.error('Error processing eligibility:', error);
    return NextResponse.json(
      { error: 'Failed to process eligibility check' },
      { status: 500 }
    );
  }
}

function calculateEligibilityScore(data: EligibilityData): number {
  // Implement your scoring logic here
  // This is a simplified example
  let score = 500;
  
  if (data.totalIncome > 50000) score += 100;
  if (data.daysEmployed > 365) score += 50;
  if (data.education === 'Tertiary') score += 50;
  if (data.housingType === 'Owned') score += 50;
  
  return Math.min(score, 850);
}

function getCreditWorthiness(score: number): string {
  if (score >= 700) return 'High';
  if (score >= 600) return 'Good';
  return 'Low';
}

function getLoanRange(score: number): string {
  if (score >= 700) return '50,000 - 100,000';
  if (score >= 600) return '20,000 - 50,000';
  return '0 - 20,000';
}
