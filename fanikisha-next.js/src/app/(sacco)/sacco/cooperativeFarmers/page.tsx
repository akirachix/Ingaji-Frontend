// "use client";
// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";

// import { useFetchCooperatives } from "@/app/hooks/useFetchCooperative";
// import { FarmerData } from "../../../utils/types";
// import Layout from "../components/Layout";

// const CooperativeDashboard: React.FC = () => {
//   const {
//     data: cooperatives,
//     isLoading: loadingCooperatives,
//     error: errorCooperatives,
//   } = useFetchCooperatives();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [farmersData, setFarmersData] = useState<{ [key: number]: FarmerData }>(
//     {}
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const cooperativesPerPage = 10;

//   useEffect(() => {
//     const fetchFarmersData = async () => {
//       if (cooperatives && cooperatives.length > 0) {
//         const farmersByCooperative: { [key: number]: FarmerData } = {};

//         for (const cooperative of cooperatives) {
//           try {
//             const response = await fetch(
//               `https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers/?cooperative_id=${cooperative.cooperative_id}`
//             );
//             if (!response.ok) {
//               console.error(
//                 "Error fetching farmers for cooperative ID",
//                 cooperative.cooperative_id,
//                 ":",
//                 response.status,
//                 response.statusText
//               );
//               farmersByCooperative[cooperative.cooperative_id] = {
//                 count: 0,
//                 farmers: [],
//               };
//               continue;
//             }

//             const { count, farmers } = await response.json();
//             farmersByCooperative[cooperative.cooperative_id] = {
//               count,
//               farmers,
//             };
//           } catch (error) {
//             console.error("Error fetching farmers:", error);
//           }
//         }

//         setFarmersData(farmersByCooperative);
//       }
//     };

//     fetchFarmersData();
//   }, [cooperatives]);

//   const filteredCooperatives = cooperatives
//     ? cooperatives.filter((cooperative) =>
//         cooperative.cooperative_name
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase())
//       )
//     : [];

//   const totalCooperatives = filteredCooperatives.length;
//   const totalPages = Math.ceil(totalCooperatives / cooperativesPerPage);
//   const indexOfLastCooperative = currentPage * cooperativesPerPage;
//   const indexOfFirstCooperative = indexOfLastCooperative - cooperativesPerPage;
//   const currentCooperatives = filteredCooperatives.slice(
//     indexOfFirstCooperative,
//     indexOfLastCooperative
//   );

//   return (
//     <Layout>
//     <div className="bg-white">
//       <header className="text-[#299acf] p-4">
//         <div className="container mx-auto">
//           <h1 className="text-[40px] font-bold">Cooperatives</h1>
//         </div>
//       </header>
//       <main className="container mx-auto p-4">
//         <section className="mt-4">
//           <div className="relative flex mb-4">
//             <div className="flex-grow max-w-lg">
//               <input
//                 type="text"
//                 placeholder="Search by Cooperative Name..."
//                 className="border border-[#1d4ed8] rounded-full px-4 py-2 w-full pl-10"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1d4ed8]" />
//             </div>
//           </div>

//           {loadingCooperatives ? (
//             <p className="text-customBlue text-[20px]">
//               Loading cooperatives...
//             </p>
//           ) : errorCooperatives ? (
//             <p className="text-customBlue">{errorCooperatives}</p>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
//                   <thead>
//                     <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
//                       <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
//                         Cooperative Name
//                       </th>
//                       <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">
//                         Number of Farmers
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentCooperatives.map((cooperative) => {
//                       const farmerCount =
//                         farmersData[cooperative.cooperative_id]?.count || 0;
//                       return (
//                         <tr
//                           key={cooperative.cooperative_id}
//                           className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
//                         >
//                           <td className="py-3 px-6">
//                             {cooperative.cooperative_name}
//                           </td>
//                           <td className="py-3 px-6">{farmerCount}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="flex justify-center items-center mt-4">
//                 <button
//                   className={`mx-1 px-4 py-2 rounded ${
//                     currentPage === 1
//                       ? "bg-gray-200 text-gray-700 cursor-not-allowed"
//                       : "bg-blue-500 text-white"
//                   }`}
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                 >
//                   {"<"}
//                 </button>
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <button
//                     key={index}
//                     className={`mx-1 px-4 py-2 rounded ${
//                       currentPage === index + 1
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-200 text-gray-700"
//                     }`}
//                     onClick={() => setCurrentPage(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//                 <button
//                   className={`mx-1 px-4 py-2 rounded ${
//                     currentPage === totalPages
//                       ? "bg-gray-200 text-gray-700 cursor-not-allowed"
//                       : "bg-blue-500 text-white"
//                   }`}
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                   }
//                   disabled={currentPage === totalPages}
//                 >
//                   {">"}
//                 </button>
//               </div>
//             </>
//           )}
//         </section>
//       </main>
//     </div>
//     </Layout>
//   );
// };

// export default CooperativeDashboard;
"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useFetchCooperatives } from "@/app/hooks/useFetchCooperative";
import { FarmerData } from "../../../utils/types";
import Layout from "../components/Layout";

const CooperativeDashboard: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: cooperatives,
    isLoading: loadingCooperatives,
    error: errorCooperatives,
  } = useFetchCooperatives();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [farmersData, setFarmersData] = useState<{ [key: number]: FarmerData }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const cooperativesPerPage = 10;

  useEffect(() => {
    const fetchFarmersData = async () => {
      if (cooperatives && cooperatives.length > 0) {
        const farmersByCooperative: { [key: number]: FarmerData } = {};

        for (const cooperative of cooperatives) {
          try {
            const response = await fetch(
              `https://fanikisha-3beb7fcefffe.herokuapp.com/api/farmers/?cooperative_id=${cooperative.cooperative_id}`
            );
            if (!response.ok) {
              console.error("Error fetching farmers for cooperative ID", cooperative.cooperative_id, ":", response.status, response.statusText);
              farmersByCooperative[cooperative.cooperative_id] = { count: 0, farmers: [] };
              continue;
            }

            const { count, farmers } = await response.json();
            farmersByCooperative[cooperative.cooperative_id] = { count, farmers };
          } catch (error) {
            console.error("Error fetching farmers:", error);
          }
        }

        setFarmersData(farmersByCooperative);
      }
    };

    fetchFarmersData();
  }, [cooperatives]);

  const filteredCooperatives = cooperatives
    ? cooperatives.filter((cooperative) =>
        cooperative.cooperative_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalCooperatives = filteredCooperatives.length;
  const totalPages = Math.ceil(totalCooperatives / cooperativesPerPage);
  const indexOfLastCooperative = currentPage * cooperativesPerPage;
  const indexOfFirstCooperative = indexOfLastCooperative - cooperativesPerPage;
  const currentCooperatives = filteredCooperatives.slice(indexOfFirstCooperative, indexOfLastCooperative);

  return (
    <Layout>
      <div className="bg-white">
        <header className="text-[#299acf] p-4">
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
                  placeholder="Search by Cooperative Name..."
                  className="border border-[#1d4ed8] rounded-full px-4 py-2 w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1d4ed8]" />
              </div>
            </div>

            {loadingCooperatives ? (
              <p className="text-customBlue text-[20px]">Loading cooperatives...</p>
            ) : errorCooperatives ? (
              <p className="text-customBlue">{errorCooperatives}</p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead>
                      <tr className="bg-gray-50 uppercase text-xs leading-normal tracking-wider border-b border-gray-200">
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Cooperative Name</th>
                        <th className="py-3 px-6 text-left font-bold text-customBlue text-[20px]">Number of Farmers</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCooperatives.map((cooperative) => {
                        const farmerCount = farmersData[cooperative.cooperative_id]?.count || 0;
                        return (
                          <tr
                            key={cooperative.cooperative_id}
                            className="border-b border-gray-200 hover:bg-gray-100 transition duration-200 cursor-pointer"
                            onClick={() => navigate(`/cooperative/${cooperative.cooperative_id}`)}
                          >
                            <td className="py-3 px-6">{cooperative.cooperative_name}</td>
                            <td className="py-3 px-6">{farmerCount}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className={`mx-1 px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    {"<"}
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className={`mx-1 px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

export default CooperativeDashboard;
