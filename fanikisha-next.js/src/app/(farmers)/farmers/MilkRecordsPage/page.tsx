"use client"

import React, { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const MilkRecordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const milkRecords = [
    { name: "Raziah Abdullahi", quantity: 20, pricePerLitre: 20, total: 4000 },
    { name: "Akwang Deu", quantity: 50, pricePerLitre: 50, total: 1000 },
    { name: "Fanny Ingabire", quantity: 12, pricePerLitre: 20, total: 243 },
    { name: "Agnes Ajema", quantity: 23, pricePerLitre: 25, total: 4567 },
    { name: "Maryann Muthoni", quantity: 45, pricePerLitre: 35, total: 12341 },
    { name: "Jacky Wamboi", quantity: 50, pricePerLitre: 50, total: 260 },
    { name: "Miriam Koome", quantity: 12, pricePerLitre: 35, total: 15000 },
    { name: "Moses Kimani", quantity: 23, pricePerLitre: 25, total: 4300 },
    { name: "Salim Abdi", quantity: 23, pricePerLitre: 30, total: 12000 },
  ];

  const filteredRecords = milkRecords.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600 text-[44px]">Milk Records</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/4 p-2 border rounded scroll-m-3 justify-center border-blue-500 mt-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full mt-16">
        <thead>
          <tr className="border-b border-b-8 border-blue-600 p-12">
            <th className="border p-4 text-blue-600 text-[22px]">Farmer&apos;s Name</th>
            <th className="border p-4 text-blue-600 text-[22px]">Quantity (L)</th>
            <th className="border p-4 text-blue-600 text-[22px]">Price per Litre</th>
            <th className="border p-4 text-blue-600 text-[22px]">Total (Ksh)</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-30' : 'bg-white'}>
              <td className="border p-3 border-b-1 border-black">{record.name}</td>
              <td className="border p-3 border-b-1 border-black">{record.quantity}</td>
              <td className="border p-3 border-b-1 border-black">{record.pricePerLitre}</td>
              <td className="border p-3 border-b-1 border-black">{record.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-20">
        <IoChevronBack className="text-blue-500 text-3xl" />
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded ${
                page === 1 ? 'bg-blue-500 text-white' : 'text-gray-500'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <IoChevronForward className="text-blue-500 text-3xl" />
      </div>
    </div>
  );
};

export default MilkRecordsPage;