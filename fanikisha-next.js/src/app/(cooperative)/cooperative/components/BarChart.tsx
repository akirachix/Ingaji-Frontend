import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MilkRecord {
  date: string; 
  milk_quantity: number;
}

interface BarChartProps {
  milkRecords: MilkRecord[];
}

const BarChartComponent: React.FC<BarChartProps> = ({ milkRecords }) => {
  const data = milkRecords.map(record => ({
    date: new Date(record.date).toLocaleDateString(),
    milk_quantity: record.milk_quantity, 
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="date" label={{ value: '', position: 'insideBottom', offset: 0 }} />
        <YAxis label={{ value: 'Milk Quantity', angle: -90, position: 'insideLeft', offset: 10 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="milk_quantity" fill="#5687F2" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
