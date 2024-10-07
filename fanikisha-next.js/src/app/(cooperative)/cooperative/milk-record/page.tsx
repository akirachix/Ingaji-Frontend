"use client";

import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import Layout from "@/app/Layout";
import { useMilkRecord } from "../../../hooks/useMilkRecord";

interface MilkRecord {
  record_id: number;
  first_name: string;
  last_name: string;
  milk_quantity: number;
  price: number;
  date: string;
}

const MilkRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: milkRecords, loading, error } = useMilkRecord();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const router = useRouter();

  if (loading)
    return (
      <Layout>
        <div className="container mx-auto p-4">Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div className="container mx-auto p-4">Error: {error}</div>
      </Layout>
    );

  const filteredRecords = milkRecords
    ? milkRecords.filter((record: MilkRecord) => {
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
      })
    : [];

  const totalRecords = filteredRecords.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const handleRowClick = (record_id: number) => {
    router.push(`/farmer/${record_id}`);
  };

  return (
    <Layout>
      <div className="bg-white">
        <header className="text-blue-500 p-4">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold">Milk Records</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <section className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow max-w-lg">
                <input
                  type="text"
                  placeholder="Search by Name..."
                  className="border border-gray-300 rounded-full px-4 py-2 w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            {currentRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">
                        First Name
                      </th>
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">
                        Last Name
                      </th>
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">
                        Quantity (L)
                      </th>
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">
                        Price per Litre
                      </th>
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">
                        Date
                      </th>
                      <th className="py-3 px-6 text-left font-bold text-blue-500 text-lg">
                        Total (Ksh)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRecords.map((record: MilkRecord) => (
                      <tr
                        key={record.record_id}
                        className="border-b border-gray-200 hover:bg-gray-100 transition duration-200 cursor-pointer"
                        onClick={() => handleRowClick(record.record_id)}
                      >
                        <td className="py-3 px-6">{record.first_name}</td>
                        <td className="py-3 px-6">{record.last_name}</td>
                        <td className="py-3 px-6">{record.milk_quantity}</td>
                        <td className="py-3 px-6">{record.price}</td>
                        <td className="py-3 px-6">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6">
                          {(record.milk_quantity * record.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className={`mx-1 px-4 py-2 rounded ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    }`}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    {"<"}
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`mx-1 px-4 py-2 rounded ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className={`mx-1 px-4 py-2 rounded ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    }`}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-blue-500 text-lg">No milk records found.</p>
            )}
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default MilkRecords;
