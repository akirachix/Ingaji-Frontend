import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MilkRecord {
  date: string; 
  milk_quantity: number;
}

interface BarChartProps {
  milkRecords: MilkRecord[];
  width: number;
  height: number;
}

const BarChartComponent: React.FC<BarChartProps> = ({ milkRecords, width, height }) => {
  const data = milkRecords.map(record => ({
    date: new Date(record.date).toLocaleDateString(),
    milk_quantity: record.milk_quantity, 
  }));

  console.log(milkRecords);

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="milk_quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
