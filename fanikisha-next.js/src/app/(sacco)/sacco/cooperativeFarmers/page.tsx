"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useScore } from "@/app/hooks/useScore";
import Layout from "../components/Layout";
import FarmerDetailsModal from "../FarmerDetailsModal";

interface FarmerData {
  farmer_id: number;
  first_name: string;
  last_name: string;
  cooperative_id: number;
  totalIncome?: number;
  age?: number;
  education?: string;
  carOwnership?: string;
  numberOfChildren?: number;
  totalIncome2?: number;
  gender?: string;
  familyMembers?: number;
  familyStatus?: string;
  housingType?: string;
  daysEmployed?: number;
  occupationType?: string;
  credit_score?: {
    score: number;
    credit_worthiness: string;
    loan_range: number;
    last_checked_date: string;
    is_eligible: boolean;
  };
}

interface CreditScore {
  credit_score_id: number;
  farmer_id: number;
  score: number;
  credit_worthiness: string;
  loan_range: number;
  last_checked_date: string;
  is_eligible: boolean;
}

interface CooperativeData {
  cooperative_id: number;
  cooperative_name: string;
}

const FarmersDashboard: React.FC = () => {
  const [cooperatives, setCooperatives] = useState<CooperativeData[]>([]);
  const { data: creditScores, loading: loadingScores, error: errorScores } = useScore() as{
    data: CreditScore[] | undefined; 
    loading: boolean; 
    error: string | null; 
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [farmers, setFarmers] = useState<FarmerData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerData | null>(null);
  const itemsPerPage = 7;
  
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch(
          'https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers/'
        );
        if (!response.ok) throw new Error('Failed to fetch farmers');
        
        const { farmers } = await response.json();
        setFarmers(farmers);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    const fetchCooperatives = async () => {
      try {
        const response = await fetch(
          'https://fanikisha-3beb7fcefffe.herokuapp.com/api/cooperatives/'
        );
        if (!response.ok) throw new Error('Failed to fetch cooperatives');
        
        const { cooperatives } = await response.json();
        setCooperatives(cooperatives);
      } catch (error) {
        console.error("Error fetching cooperatives:", error);
      }
    };

    fetchFarmers();
    fetchCooperatives();
  }, []);

  useEffect(() => {
    console.log("Cooperatives:", cooperatives);
    console.log("Farmers:", farmers);
  
    if (cooperatives.length > 0 && farmers.length > 0) {
      const updatedFarmers = farmers.map(farmer => {
        const cooperative = cooperatives.find(
          coop => coop.cooperative_id === farmer.cooperative_id
        );
  
        return {
          ...farmer,
          cooperative_name: cooperative ? cooperative.cooperative_name : "Unknown Cooperative"
        };
      });
  
      setFarmers(updatedFarmers);
    }
  }, [cooperatives, farmers]);
  
  useEffect(() => {
    if (creditScores && farmers.length > 0) {
      const updatedFarmers = farmers.map(farmer => {
        const creditScore = creditScores.find((score: CreditScore) => score.farmer_id === farmer.farmer_id);
          return {
            ...farmer,
            credit_score: creditScore
            ?{
              score: creditScore.score,
              credit_worthiness: creditScore.credit_worthiness,
              loan_range: creditScore.loan_range,
              last_checked_date: creditScore.last_checked_date,
              is_eligible: creditScore.is_eligible,
            }
            : undefined,
          };
        
      });
      setFarmers(updatedFarmers);
    }
  }, [creditScores, farmers]);

  const fetchFarmerDetails = async (farmerId: number) => {
    try {
      const response = await fetch(`https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers/${farmerId}/details`);
      if (!response.ok) {
        throw new Error('Failed to fetch farmer details');
      }
      const farmerDetails = await response.json();
      return farmerDetails;
    } catch (error) {
      console.error("Error fetching farmer details:", error);
      return null;
    }
  };

  const handleViewEligibility = async (farmer: FarmerData) => {
    try {
      const farmerDetails = await fetchFarmerDetails(farmer.farmer_id);
      
      const combinedFarmerData = {
        ...farmer,
        ...farmerDetails,
      };
      
      setSelectedFarmer(combinedFarmerData);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error checking eligibility:', err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const filteredFarmers = useMemo(() => {
    return farmers.filter(
      (farmer) =>
        farmer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (farmer.credit_score?.last_checked_date || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (farmer.credit_score?.score?.toString() || "").includes(searchTerm.toLowerCase()) ||
        (farmer.credit_score?.credit_worthiness || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (farmer.credit_score?.is_eligible ? "Eligible" : "Not Eligible").toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => b.farmer_id - a.farmer_id);
  }, [farmers, searchTerm]);
  
  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
  const indexOfLastFarmer = currentPage * itemsPerPage;
  const indexOfFirstFarmer = indexOfLastFarmer - itemsPerPage;
  const paginatedFarmers = filteredFarmers.slice(indexOfFirstFarmer, indexOfLastFarmer);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
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

  if (loadingScores)
    return (
      <Layout>
        <div className="text-customBlue text-lg lg:text-xl 2xl:text-2xl">
          Loading data...
        </div>
      </Layout>
    );

  if (errorScores)
    return (
      <Layout>
        <div className="text-customBlue text-lg lg:text-xl 2xl:text-2xl">
          {errorScores}
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="bg-white">
        <header className="text-[#299ACF] p-4">
          <div className="container mx-auto">
            <h1 className="text-[40px] font-bold">Farmers</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <section className="mt-4">
            <div className="relative flex mb-4">
              <div className="flex-grow max-w-lg">
                <input
                  type="text"
                  placeholder="Search farmers..."
                  className="border border-[#1D4ED8] rounded-full px-4 py-2 w-full pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1D4ED8]" />
              </div>
            </div>

            <div className="mt-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                      <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">First Name</th>
                      <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Last Name</th>
                      <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Last Checked</th>
                      <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Credit Worthiness</th>
                      <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Status</th>
                      <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedFarmers.map((farmer) => (
                      <tr key={farmer.farmer_id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-200">
                        <td className="py-3 px-6">{farmer.first_name}</td>
                        <td className="py-3 px-6">{farmer.last_name}</td>
                        <td className="py-3 px-6">
                          {farmer.credit_score?.last_checked_date || "N/A"}
                        </td>
                        <td className="py-3 px-6">
                          {farmer.credit_score?.credit_worthiness || "N/A"}
                        </td>
                        <td className="py-3 px-6">
                        <span className={`px-2 py-1 rounded ${
                          farmer.credit_score?.is_eligible === undefined
                            ? "bg-yellow-100 text-yellow-800" 
                            : farmer.credit_score?.is_eligible
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {farmer.credit_score?.is_eligible === undefined
                            ? "Unknown" 
                            : farmer.credit_score?.is_eligible
                            ? "Eligible"
                            : "Not Eligible"}
                        </span>
                        </td>
                        <td className="py-3 px-6">
                          <button
                            onClick={() => handleViewEligibility(farmer)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
                          >
                            Check Eligibility
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
                  <FaChevronLeft />
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </section>
        </main>

        <FarmerDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          farmerData={selectedFarmer || undefined}
        />
      </div>
    </Layout>
  );
};

export default FarmersDashboard;




