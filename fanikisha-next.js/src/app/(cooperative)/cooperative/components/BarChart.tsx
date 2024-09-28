// // // In BarChart.tsx
// // import React from 'react';
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // interface MilkRecord {
// //   date: string; // Date in string format
// //   milk_quantity: number; // Quantity of milk
// // }

// // interface BarChartProps {
// //   milkRecords: MilkRecord[]; // Changed from data to milkRecords
// //   width: number;
// //   height: number;
// // }

// // const BarChartComponent: React.FC<BarChartProps> = ({ milkRecords, width, height }) => {
// //   // Format the data for the chart
// //   const data = milkRecords.map(record => ({
// //     date: record.date,
// //     milk_quantity: record.milk_quantity,
// //   }));

// //   return (
// //     <ResponsiveContainer width={width} height={height}>
// //       <BarChart data={data}>
// //         <XAxis dataKey="date" />
// //         <YAxis />
// //         <Tooltip />
// //         <Legend />
// //         <Bar dataKey="milk_quantity" fill="#8884d8" />
// //       </BarChart>
// //     </ResponsiveContainer>
// //   );
// // };

// // export default BarChartComponent;



// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface MilkRecord {
//   date: string;
//   milk_quantity: number;
// }

// interface BarChartProps {
//   milkRecords: MilkRecord[]; 
//   width: number;
//   height: number;
// }

// const BarChartComponent: React.FC<BarChartProps> = ({ milkRecords, width, height }) => {
//   const data = milkRecords.map(record => ({
//     date: record.date,
//     milk_quantity: record.milk_quantity,
//   }));

// console.log(milkRecords);


//   return (
//     <ResponsiveContainer width={width} height={height}>
//       <BarChart data={data}>
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="milk_quantity" fill="#8884d8" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

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
