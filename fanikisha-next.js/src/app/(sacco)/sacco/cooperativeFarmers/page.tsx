"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useFetchCooperatives } from "@/app/hooks/useFetchCooperative";
import { useScore } from "@/app/hooks/useScore";
import Layout from "../components/Layout";
import BarChartComponent from "../components/BarChart";
import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";

interface FarmerData {
 farmer_id: number;
 first_name: string;
 last_name: string;
 credit_score?: {
 score: number;
 credit_worthiness: string;
 loan_range: number;
 last_checked_date: string;
 is_eligible: boolean;
 };
}



interface MilkRecord {
 record_id: number;
 farmer_id: number;
 milk_quantity: number;
 price: number;
 date: string;
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
const CooperativeDashboard: React.FC = () => {
 const {
 data: cooperatives,
 isLoading: loadingCooperatives,
 error: errorCooperatives,
 } = useFetchCooperatives();
 
 
 const { data: creditScores, loading: loadingScores, error: errorScores }: { data: CreditScore[]; loading: boolean; error: string | null } = useScore();
 const [searchTerm, setSearchTerm] = useState("");
 const [farmersData, setFarmersData] = useState<{ [key: number]: FarmerData[] }>({});
 const [currentPage, setCurrentPage] = useState(1);
 const [selectedCooperativeId, setSelectedCooperativeId] = useState<number | null>(null);
 const [selectedFarmerId, setSelectedFarmerId] = useState<number | null>(null);
 const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
 const itemsPerPage = 7;

 useEffect(() => {
 const fetchFarmersData = async () => {
 if (cooperatives && cooperatives.length > 0) {
 const farmersByCooperative: { [key: number]: FarmerData[] } = {};
 for (const cooperative of cooperatives) {
 try {
 const response = await fetch(
 `https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers/?cooperative_id=${cooperative.cooperative_id}`
 );
 if (!response.ok) {
 console.error(
 "Error fetching farmers for cooperative ID",
 cooperative.cooperative_id,
 ":",
 response.status,
 response.statusText
 );
 farmersByCooperative[cooperative.cooperative_id] = [];
 continue;
 }
 const { farmers } = await response.json();
 farmersByCooperative[cooperative.cooperative_id] = farmers;
 } catch (error) {
 console.error("Error fetching farmers:", error);
 }
 }
 setFarmersData(farmersByCooperative);
 }
 };
 fetchFarmersData();
 }, [cooperatives]);

 useEffect(() => {
 if (creditScores && farmersData) {
 const updatedFarmersData = { ...farmersData };
 Object.keys(updatedFarmersData).forEach((cooperativeId) => {
 updatedFarmersData[Number(cooperativeId)] = updatedFarmersData[Number(cooperativeId)].map(farmer => {
 const creditScore = creditScores.find((score: CreditScore) => score.farmer_id === farmer.farmer_id);
 return {
 ...farmer,
 credit_score: creditScore ? {
 score: creditScore.score,
 credit_worthiness: creditScore.credit_worthiness,
 loan_range: creditScore.loan_range,
 last_checked_date: creditScore.last_checked_date,
 is_eligible: creditScore.is_eligible,
 } : undefined
 };
 });
 });
 setFarmersData(updatedFarmersData);
 }
 }, [creditScores, farmersData]);

 
 useEffect(() => {
 const fetchData = async () => {
 if (selectedFarmerId) {
 try {
 const records = await fetchMilkRecords();
 const filteredRecords = records.filter(
 (record: MilkRecord) => record.farmer_id === selectedFarmerId
 );
 setMilkRecords(filteredRecords);
 } catch (error) {
 console.error("Error fetching milk records:", error);
 }
 }
 };

 fetchData();
 }, [selectedFarmerId]);

 const filteredCooperatives = useMemo(() => {
 return cooperatives
 ? cooperatives.filter((cooperative) =>
 cooperative.cooperative_name
 .toLowerCase()
 .includes(searchTerm.toLowerCase())
 )
 : [];
 }, [cooperatives, searchTerm]);

 
const currentFarmers = useMemo(() => {
 return selectedCooperativeId ? farmersData[selectedCooperativeId] || [] : [];
}, [farmersData, selectedCooperativeId]);


const filteredFarmers = useMemo(() => {
 return currentFarmers.filter(
 (farmer) =>
 farmer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 farmer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
 (farmer.credit_score?.last_checked_date || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
 (farmer.credit_score?.score?.toString() || "").includes(searchTerm.toLowerCase()) ||
 (farmer.credit_score?.credit_worthiness || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
 (farmer.credit_score?.is_eligible ? "Eligible" : "Not Eligible").toLowerCase().includes(searchTerm.toLowerCase())
 );
}, [currentFarmers, searchTerm]);


 const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
 const indexOfLastFarmer = currentPage * itemsPerPage;
 const indexOfFirstFarmer = indexOfLastFarmer - itemsPerPage;
 const paginatedFarmers = filteredFarmers.slice(indexOfFirstFarmer, indexOfLastFarmer);

 const handleCooperativeClick = (cooperativeId: number) => {
 setSelectedCooperativeId(cooperativeId);
 setSelectedFarmerId(null);
 setCurrentPage(1);
 setSearchTerm("");
 };

 const handleBackButtonClick = () => {
 if (selectedFarmerId) {
 setSelectedFarmerId(null);
 } else {
 setSelectedCooperativeId(null);
 }
 setCurrentPage(1);
 setSearchTerm("");
 };

 const handlePageChange = (newPage: number) => {
 setCurrentPage(newPage);
 };

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


  const handleViewEligibility = async (farmerId: number) => {
    setSelectedFarmerId(farmerId);
    try {
      const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/check-eligibity/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ farmer_id: farmerId }),
      });
      if (!response.ok) {
      } else {
      }
    }  catch (err) {
      console.error('Error checking eligibility:', err instanceof Error ? err.message : 'Unknown error');
    }
  };
  const getColor = (worthiness: string) => {
    switch (worthiness.toLowerCase()) {
      case "high":
        return "green";
      case "good":
        return "orange";
      case "low":
        return "red";
      default:
        return "black";
    }
  };



 if (loadingCooperatives || loadingScores)
 return (
 <Layout>
 <div className="text-customBlue text-lg lg:text-xl 2xl:text-2xl">
 Loading data...
 </div>
 </Layout>
 );

 if (errorCooperatives || errorScores)
 return (
 <Layout>
 <div className="text-customBlue text-lg lg:text-xl 2xl:text-2xl">
 {errorCooperatives || errorScores}
 </div>
 </Layout>
 );

 return (
 <Layout>
 <div className="bg-white">
 <header className="text-[#299ACF] p-4">
 <div className="container mx-auto">
 <h1 className="text-[40px] font-bold">Cooperatives</h1>
 </div>
 </header>
 <main className="container mx-auto p-4">
 <section className="mt-4">
 <div className="relative flex mb-4">
 <div className="flex-grow max-w-lg">
 <input
 type="text"
 placeholder={selectedCooperativeId ? "Search farmers..." : "Search cooperatives..."}
 className="border border-[#1D4ED8] rounded-full px-4 py-2 w-full pl-10"
 value={searchTerm}
 onChange={handleSearch}
 />
 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1D4ED8]" />
 </div>
 </div>
 {(selectedCooperativeId || selectedFarmerId) && (
 <div className="mt-6 flex items-center">
 <button
 onClick={handleBackButtonClick}
 className="flex items-center text-blue-500 font-bold p-2 rounded hover:bg-gray-100 transition duration-200"
 >
 <FaArrowLeft className="mr-2" />
 <h1>Back {selectedFarmerId ? "to Farmers" : "to Cooperatives"}</h1>
 </button>
 </div>
 )}
 {!selectedCooperativeId && !selectedFarmerId && (
 <div className="overflow-x-auto">
 <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
 <thead>
 <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
 Cooperative Name
 </th>
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
 Number of Farmers
 </th>
 </tr>
 </thead>
 <tbody>
 {filteredCooperatives.map((cooperative) => {
 const farmerCount =
 farmersData[cooperative.cooperative_id]?.length || 0;
 return (
 <tr
 key={cooperative.cooperative_id}
 className="border-b border-gray-200 hover:bg-gray-100 transition duration-200 cursor-pointer"
 onClick={() => handleCooperativeClick(cooperative.cooperative_id)}
 >
 <td className="py-3 px-6">
 {cooperative.cooperative_name}
 </td>
 <td className="py-3 px-6">{farmerCount}</td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 )}
 {selectedCooperativeId && !selectedFarmerId && (
 <div className="mt-6">
 <h2 className="text-xl font-bold mb-4">
 Farmers in {cooperatives?.find(c => c.cooperative_id === selectedCooperativeId)?.cooperative_name}
 </h2>
 <div className="overflow-x-auto">
 <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
 <thead>
 <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">First Name</th>
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Last Name</th>
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Last Checked</th>
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Score</th>
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Credit Worthiness</th>
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Status</th>
 <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
 Eligibility
 </th>
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
 {farmer.credit_score?.score || "N/A"}
 </td>
 <td className="py-3 px-6">
 {farmer.credit_score?.credit_worthiness || "N/A"}
 </td>
 <td className="py-3 px-6">
 <span className={`px-2 py-1 rounded ${
 farmer.credit_score?.is_eligible
 ? "bg-green-100 text-green-800"
 : "bg-red-100 text-red-800"
 }`}>
 {farmer.credit_score?.is_eligible ? "Eligible" : "Not Eligible"}
 </span>
 </td>
 <td className="py-3 px-6">
 <button
 onClick={() => handleViewEligibility(farmer.farmer_id)}
 className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition duration-200"
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
 <FaChevronRight />
 </button>
 </div>
 </div>
 )}
 {selectedFarmerId && (
 <div className="mt-6">
 <div className="flex items-center mb-4">
 </div>
 <h2 className="text-2xl font-semibold mb-4">
 Farmer Details - ID: {selectedFarmerId}
 </h2>
 <div className="flex flex-col lg:flex-row gap-8">
 <div className="w-full lg:w-1/2">
 <h3 className="text-2xl mb-4">Milk Production</h3>
 <div className="h-64 lg:h-86">
 <BarChartComponent milkRecords={milkRecords} />
 </div>
 </div>
 <div className="w-full lg:w-1/2">
 <h3 className="text-2xl font-semibold mb-4">Latest Credit Score Info</h3>
 {currentFarmers.find(farmer => farmer.farmer_id === selectedFarmerId)?.credit_score ? (
 <div className="bg-white p-6 rounded-lg shadow-md">
 <p className="mb-2">
 <strong>Eligibility:</strong>{" "}
 {currentFarmers.find(farmer => farmer.farmer_id === selectedFarmerId)?.credit_score?.is_eligible
 ? "Eligible"
 : "Not Eligible"}
 </p>
 <p className="mb-2">
 <strong>Loan Range (KES):</strong>{" "}
 {currentFarmers.find(farmer => farmer.farmer_id === selectedFarmerId)?.credit_score?.loan_range || "N/A"}
 </p>
 <p className="mb-2">
 <strong>Credit Score:</strong>{" "}
 {currentFarmers.find(farmer => farmer.farmer_id === selectedFarmerId)?.credit_score?.score || "N/A"}
 </p>
 <p className="mb-2">
 <strong>Credit Worth:</strong>{" "}
 {currentFarmers.find(farmer => farmer.farmer_id === selectedFarmerId)?.credit_score?.credit_worthiness || "N/A"}
 </p>
 </div>
 ) : (
 <p>Loading credit score info...</p>
 )}
 </div>
 </div>
 <div className="mt-8">
 <h3 className="text-2xl font-semibold mb-4">Credit Score History</h3>
 <div className="overflow-x-auto">
 <table className="min-w-full bg-white border border-gray-200">
 <thead>
 <tr>
 <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-sm text-blue-600 font-bold">
 Date
 </th>
 <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-sm text-blue-600 font-bold">
 Credit Score
 </th>
 <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-sm text-blue-600 font-bold">
 Credit Worthiness
 </th>
 <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-sm text-blue-600 font-bold">
 Loan Range
 </th>
 </tr>
 </thead>
 <tbody>
 {creditScores
 .filter(score => score.farmer_id === selectedFarmerId)
 .map((score, index) => (
 <tr key={index} className={score.credit_worthiness.toLowerCase()}>
 <td className="py-2 px-4 border-b border-gray-200">
 {score.last_checked_date}
 </td>
 <td className="py-2 px-4 border-b border-gray-200">
 {score.score}
 </td>
 <td
 className="py-2 px-4 border-b border-gray-200"
 style={{ color: getColor(score.credit_worthiness) }}
 >
 {score.credit_worthiness.toLowerCase()}
 </td>
 <td className="py-2 px-4 border-b border-gray-200">
 {score.loan_range}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 )}
 </section>
 </main>
 </div>
 </Layout>
);
};

export default CooperativeDashboard;