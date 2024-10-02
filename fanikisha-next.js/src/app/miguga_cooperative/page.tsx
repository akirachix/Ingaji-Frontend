'use client';
import React, { useState, useMemo } from 'react';
import { FaSearch } from "react-icons/fa";
import Layout from '../(sacco)/sacco/components/Layout';
import { useScore } from '../(sacco)/sacco/hooks/useScore';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredScores = useMemo(() => {
    return data.filter((score: CreditScore) =>
      score.farmer_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.last_checked_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.score.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.credit_worthiness.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (score.is_eligible ? 'Eligible' : 'Not Eligible').toLowerCase().includes(searchTerm.toLowerCase())
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

  if (loading) return <Layout><div className="text-customBlue text-[20px]">Loading credit scores...</div></Layout>;
  if (error) return <Layout><div className="text-customBlue">{error}</div></Layout>;

  return (
    <Layout>
      <div className="bg-white">
        <header className="text-[#299acf] p-4">
          <div className="container mx-auto">
            <h1 className="text-[40px] font-bold">Credit Scores</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <section className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="relative flex-grow max-w-lg">
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-[#1d4ed8] rounded-full px-4 py-2 w-full pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1d4ed8]" />
              </div>
            </div>

            {filteredScores.length === 0 ? (
              <p className="text-customBlue text-[20px]">No credit scores data available.</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                      <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Farmer ID</th>
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Last Checked</th>
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Score</th>
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Status</th>
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Eligibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentScores.map((score: CreditScore) => (
                        <tr key={score.credit_score_id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                          <td className="py-3 px-6">{score.farmer_id}</td>
                          <td className="py-3 px-6">{score.last_checked_date}</td>
                          <td className="py-3 px-6">{score.score}</td>
                          <td className="py-3 px-6">{score.is_eligible ? 'Eligible' : 'Not Eligible'}</td>
                          <td className="py-3 px-6">
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
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
    </Layout>
  );
};

export default MugugaCooperative;