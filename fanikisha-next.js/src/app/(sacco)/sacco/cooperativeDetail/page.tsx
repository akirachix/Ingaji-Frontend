"use client";
import React, { useState, useMemo } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Layout from "../components/Layout";
import { useScore } from "@/app/hooks/useScore";

interface CreditScore {
  credit_score_id: number;
  farmer_id: number;
  score: number;
  credit_worthiness: string;
  loan_range: number;
  last_checked_date: string;
  is_eligible: boolean;
}

const MugugaCooperative: React.FC = () => {
  const { data, loading, error } = useScore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredScores = useMemo(() => {
    return data.filter(
      (score: CreditScore) =>
        score.farmer_id
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        score.last_checked_date
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        score.score
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        score.credit_worthiness
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (score.is_eligible ? "Eligible" : "Not Eligible")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredScores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentScores = filteredScores.slice(startIndex, endIndex);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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

  if (loading)
    return (
      <Layout>
        <div className="text-customBlue text-lg lg:text-xl 2xl:text-2xl">
          Loading credit scores...
        </div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div className="text-customBlue text-lg lg:text-xl 2xl:text-2xl">
          {error}
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="bg-white">
        <header className="text-[#299acf] p-4">
          <div className="container mx-auto px-4 lg:px-6 2xl:px-8">
            <h1 className="text-3xl lg:text-4xl 2xl:text-5xl font-bold">
              Miguga Cooperative
            </h1>
          </div>
        </header>
        <main className="container mx-auto px-4 lg:px-6 2xl:px-8">
          <section className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow max-w-lg">
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-[#1d4ed8] rounded-full px-4 py-2 w-full pl-10 text-sm lg:text-base"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1d4ed8]" />
              </div>
            </div>

            {filteredScores.length === 0 ? (
              <p className="text-customBlue text-lg lg:text-xl 2xl:text-2xl">
                No credit scores data available.
              </p>
            ) : (
              <>
                <div className="overflow-x-auto -mx-4 lg:-mx-6 2xl:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle px-4 lg:px-6 2xl:px-8">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                      <thead>
                        <tr className="bg-gray-50 uppercase text-xs lg:text-sm leading-normal tracking-wider border-b border-gray-200">
                          <th className="py-2 lg:py-3 px-3 lg:px-4 text-left font-bold text-customBlue">
                            Farmer ID
                          </th>
                          <th className="py-2 lg:py-3 px-3 lg:px-4 text-left font-bold text-customBlue">
                            Last Checked
                          </th>
                          <th className="py-2 lg:py-3 px-3 lg:px-4 text-left font-bold text-customBlue">
                            Score
                          </th>
                          <th className="py-2 lg:py-3 px-3 lg:px-4 text-left font-bold text-customBlue">
                            Status
                          </th>
                          <th className="py-2 lg:py-3 px-3 lg:px-4 text-left font-bold text-customBlue">
                            Eligibility
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentScores.map((score: CreditScore) => (
                          <tr
                            key={score.credit_score_id}
                            className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                          >
                            <td className="py-2 lg:py-3 px-3 lg:px-4 text-sm lg:text-base">
                              {score.farmer_id}
                            </td>
                            <td className="py-2 lg:py-3 px-3 lg:px-4 text-sm lg:text-base">
                              {score.last_checked_date}
                            </td>
                            <td className="py-2 lg:py-3 px-3 lg:px-4 text-sm lg:text-base">
                              {score.score}
                            </td>
                            <td className="py-2 lg:py-3 px-3 lg:px-4 text-sm lg:text-base">
                              <span
                                className={
                                  score.is_eligible
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {score.is_eligible
                                  ? "Eligible"
                                  : "Not Eligible"}
                              </span>
                            </td>
                            <td className="py-2 lg:py-3 px-3 lg:px-4">
                              <button
                                className="bg-blue-500 text-white px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-md hover:bg-blue-600 transition duration-300"
                                onClick={() => {
                                  window.location.href = `/eligibility/${score.farmer_id}`;
                                }}
                              >
                                View Eligibility
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <button
                    className={`px-2 lg:px-3 py-1 rounded text-sm ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`hidden lg:block px-2 lg:px-3 py-1 rounded text-sm ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <span className="lg:hidden text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className={`px-2 lg:px-3 py-1 rounded text-sm ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default MugugaCooperative;

