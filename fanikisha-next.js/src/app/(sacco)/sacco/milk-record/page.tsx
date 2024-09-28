'use client';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import Layout from '../../../components/Layout';
import { useMilkRecord } from '../hooks/useMilkRecord';

interface MilkRecord {
  record_id: number;
  first_name: string;
  last_name: string;
  milk_quantity: number;
  price: number;
  date: string;
}
const MilkRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: milkRecords, loading, error } = useMilkRecord();
  if (loading) return <Layout><div className="container mx-auto p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="container mx-auto p-4">Error: {error}</div></Layout>;
  const filteredRecords = milkRecords ? milkRecords.filter((record: MilkRecord) => {
    const total = (record.milk_quantity * record.price).toFixed(2);
    const recordDate = new Date(record.date).toLocaleDateString();
    return (
      record.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.milk_quantity.toString().includes(searchTerm) ||
      record.price.toString().includes(searchTerm) ||
      recordDate.includes(searchTerm) ||
      total.includes(searchTerm)
    );
  }) : [];
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-5xl font-bold text-blue-500 mb-4">Milk Records</h1>
          <div className="relative mb-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-[54px] p-2 pr-10 text-lg border border-gray-300 rounded-[10px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <MdSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        {filteredRecords.length > 0 ? (
          <table className="w-full border-collapse text-lg">
            <thead>
              <tr className="bg-white text-left text-blue-500 border-b-8 border-blue-400  text-2xl">
                <th className="p-2 text-left text-blue-500">First Name</th>
                <th className="p-2 text-left text-blue-500">Last Name</th>
                <th className="p-2 text-left text-blue-500">Quantity (L)</th>
                <th className="p-2 text-left text-blue-500">Price per Litre</th>
                <th className="p-2 text-left text-blue-500">Date</th>
                <th className="p-2 text-left text-blue-500">Total (Ksh)</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record: MilkRecord) => (
                <tr key={record.record_id} className={record.record_id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="p-2 border-t ">{record.first_name}</td>
                  <td className="p-2 border-t">{record.last_name}</td>
                  <td className="p-2 border-t">{record.milk_quantity}</td>
                  <td className="p-2 border-t">{record.price}</td>
                  <td className="p-2 border-t">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="p-2 border-t">{(record.milk_quantity * record.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No milk records found.</p>
        )}
      </div>
     </Layout>
  );
};
export default MilkRecords;















