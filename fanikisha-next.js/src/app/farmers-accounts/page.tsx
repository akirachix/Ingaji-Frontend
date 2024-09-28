"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Layout from "../(sacco)/sacco/components/Layout";
import { useFetchFarmers } from "../(sacco)/sacco/hooks/useFetchFarmers";
import { Farmer } from "../(sacco)/sacco/utils/types";
import AddFarmerModal from "../addFarmerModal";

const FarmersDashboard: React.FC = () => {
  const { data, isLoading, error } = useFetchFarmers();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [sortedFarmers, setSortedFarmers] = useState<Farmer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const farmersPerPage = 10;

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setFarmers(data);
      } else {
        console.error("Expected an array but received:", data);
        setFarmers([]);
      }
    }
  }, [data]);

  useEffect(() => {
    const filteredFarmers: Farmer[] = farmers.filter((farmer) =>
      farmer.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filteredFarmers].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setSortedFarmers(sorted);
  }, [farmers, searchTerm]);

  const totalFarmers = sortedFarmers.length;
  const totalPages = Math.ceil(totalFarmers / farmersPerPage);
  const indexOfLastFarmer = currentPage * farmersPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - farmersPerPage;
  const currentFarmers = sortedFarmers.slice(
    indexOfFirstFarmer,
    indexOfLastFarmer
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleAddFarmer = (postFarmer: Farmer) => {
    const newFarmer = {
      ...postFarmer,
      created_at: new Date().toISOString(),
    };
    setFarmers((prevFarmers) => [newFarmer, ...prevFarmers]);
    setCurrentPage(1);
    setIsModalOpen(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <header className="text-[#299acf] p-4">
          <div className="container mx-auto">
            <h1 className="text-[40px] font-bold">Accounts</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <section className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow max-w-lg">
                <input
                  type="text"
                  placeholder="Search by Name..."
                  className="border border-[#1d4ed8] rounded-full px-4 py-2 w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1d4ed8]" />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ml-4"
              >
                + Add Farmer
              </button>
            </div>

            {isLoading ? (
              <p className="text-customBlue text-[20px]">Loading farmers...</p>
            ) : error ? (
              <p className="text-customBlue">{error.message}</p>
            ) : sortedFarmers.length === 0 ? (
              <p className=" text-customBlue text-[20px]">
                No farmers data available.
              </p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                      <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                          Name
                        </th>
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                          Cooperative No
                        </th>
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                          Phone Number
                        </th>
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
                          Join Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFarmers.map((farmer, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                        >
                          <td className="py-3 px-6 ">
                            {farmer.first_name} {farmer.last_name}
                          </td>
                          <td className="py-3 px-6">
                            {farmer.cooperative_number}
                          </td>
                          <td className="py-3 px-6">{farmer.phone_number}</td>
                          <td className="py-3 px-6">
                            {formatDate(farmer.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className={`mx-1 px-4 py-2 rounded ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white"
                    }`}
                    onClick={handlePrevPage}
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
                      onClick={() => handlePageChange(index + 1)}
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
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    {">"}
                  </button>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
      <AddFarmerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFarmerAdded={handleAddFarmer}
      />
    </Layout>
  );
};

export default FarmersDashboard;
