'use client'
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { format } from 'date-fns';
import Layout from '../components/Layout';
import { useFamers } from '../hooks/useFarmer';
import { useLoanEligibility } from '../hooks/useLoanEligibility';
import { useCooperative } from '../hooks/useCooperative';

interface CreditScore {
  credit_score_id: number;
  farmer_id: number;
  score: number;
  credit_worthiness: string;
  loan_range: number;
  last_checked_date: string;
  is_eligible: boolean;
}

interface Farmer {
  is_eligible: boolean;
  farmer_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  created_at: string;
  cooperative_number: string; 
  sacco_name: string;
  cooperative_id: number;
}

interface Cooperative {
  cooperative_id: number;
  cooperative_name: string;
  user: string;
}

const Overview: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [stats, setStats] = useState<Array<{ label: string; value: number }>>([]);
  const [pieData, setPieData] = useState<Array<{ name: string; value: number; color: string }>>([]);
  const [barData, setBarData] = useState<Array<{ name: string; value: number }>>([]);

  const { data: cooperativesData, loading: saccoLoading, error: saccoError } = useCooperative();
  const { data: loanEligibilityData, loading: loanLoading, error: loanError } = useLoanEligibility();
  const { data: farmersData, loading: farmersLoading, error: farmersError } = useFamers();

  useEffect(() => {
    console.log('Effect running');
    console.log('cooperativesData:', cooperativesData);
    console.log('loanEligibilityData:', loanEligibilityData);
    console.log('farmersData:', farmersData);

    if (cooperativesData && loanEligibilityData && farmersData) {
      const selectedMonth = format(date, 'yyyy-MM');
      console.log('Selected month:', selectedMonth);
  
      const creditScoresData = (loanEligibilityData as CreditScore[]).filter((score) =>
        format(new Date(score.last_checked_date), 'yyyy-MM') === selectedMonth
      );
      console.log('Filtered credit scores:', creditScoresData);
  
      const farmers = Array.isArray(farmersData) ? farmersData : [];
      console.log('Farmers:', farmers);
  
      const cooperatives = cooperativesData as Cooperative[];
      console.log('Cooperatives:', cooperatives);
  
      setStats([
        { label: 'Eligible to take a loan', value: creditScoresData.filter(score => score.is_eligible).length },
        { label: 'Checked eligibilities', value: creditScoresData.length },
        { label: 'Not Eligible for loan', value: creditScoresData.filter(score => !score.is_eligible).length },
        { label: 'Total cooperatives', value: cooperatives.length },
      ]);
  
      const totalChecked = creditScoresData.length;
      const eligibleCount = creditScoresData.filter((score: CreditScore) => score.is_eligible).length;
      const ineligibleCount = totalChecked - eligibleCount;
  
      setPieData([
        { name: 'Eligible Loans', value: eligibleCount, color: '#1E40AF' },
        { name: 'Not eligible for Loans', value: ineligibleCount, color: '#60A5FA' },
      ]);
  
      const cooperativeFarmerCounts = cooperatives.reduce((acc: { [key: string]: number }, coop: Cooperative) => {
        const eligibleFarmers = farmers.filter((farmer: Farmer) => 
          farmer.cooperative_id === coop.cooperative_id && farmer.is_eligible
        );
        console.log(`Eligible farmers for ${coop.cooperative_name}:`, eligibleFarmers.length);
  
        acc[coop.cooperative_name] = eligibleFarmers.length;
        return acc;
      }, {});
  
      const sortedCooperatives = Object.entries(cooperativeFarmerCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
  
      console.log('Sorted cooperatives:', sortedCooperatives);
      setBarData(sortedCooperatives);
    }
  }, [cooperativesData, loanEligibilityData, farmersData, date]);
  

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  if (saccoLoading || loanLoading || farmersLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (saccoError || loanError || farmersError) {
    return <div className="text-red-500 text-center">Error: {saccoError || loanError || farmersError}</div>;
  }

  return (
    <Layout>
      <div className="bg-white px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl mt-4 font-bold">Overview</h1>
          <div className="rounded-md border-t border-blue-500 shadow-[0_2px_4px_0px_rgba(64,123,255)] px-4 py-2 inline-block">
            <input
              type="month"
              id="date"
              name="date"
              value={format(date, 'yyyy-MM')}
              onChange={handleDateChange}
              className="border-none outline-none text-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[34px] flex flex-col justify-center items-center w-[346px] h-[220px] border-t border-blue-500 shadow-[0_2px_6px_0px_rgba(64,123,255)]"
            >
              <div className="text-6xl text-right font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-xl text-gray-600 text-center px-4">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-24">
          <div>
            <h2 className="text-2xl mb-6">Loan Eligibility Checked</h2>
            <div className="bg-white rounded-[34px] p-8 w-[720px] h-[400px] border-t border-blue-500 shadow-[0_2px_4px_0px_rgba(64,123,255)]">
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, value }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                        return (
                          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                            {`${value} (${(percent * 100).toFixed(0)}%)`}
                          </text>
                        );
                      }}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center mx-2">
                    <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl mb-6">Number of Farmers Eligible for Loans per Cooperative</h2>
            <div className="bg-white rounded-[34px] p-8 w-[720px] h-[400px] border-t border-blue-500 shadow-[0_2px_4px_0px_rgba(64,123,255)]">
              <div className="w-full h-[300px]">
                {barData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1E40AF" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p>No data available for the selected period.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Overview;