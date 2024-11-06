// "use client";
// import BarChartComponent from "../../components/BarChart";
// import { useFetchCreditScores } from "../../../../hooks/useFetchCreditScores";
// import { fetchMilkRecords } from "../../../../utils/fetchMilkRecords";
// import { useEffect, useState } from "react";
// import Layout from "@/app/Layout";

// interface MilkRecord {
//   record_id: number;
//   farmer_id: number;
//   milk_quantity: number;
//   price: number;
//   date: string;
// }

// const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
//   const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
//   const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(
//     userId as string
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 5;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const records = await fetchMilkRecords();
//         const filteredRecords = records.filter(
//           (record: MilkRecord) => record.farmer_id === Number(userId)
//         );
//         setMilkRecords(filteredRecords);
//       } catch (error) {
//         console.error("Error fetching milk records:", error);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const latestCreditScore = creditScores.sort(
//     (a, b) =>
//       new Date(b.last_checked_date).getTime() -
//       new Date(a.last_checked_date).getTime()
//   )[0];

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentCreditScores = creditScores.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   if (loadingCreditScores) return <p>Loading credit scores...</p>;
//   if (!userId) return <p>Loading user information...</p>;

//   const totalPages = Math.ceil(creditScores.length / recordsPerPage);

//   return (
//     <Layout>
//       <div className="p-5 lg:ml-70 ml-40 nh:p-3 nh:ml-0 nhm:p-5 nhm:ml-4 h-screen overflow-auto lg:w-full max-w-7xl">
//         <h1 className="text-2nhm mt-5 text-3xl font-bold mb-4 text-center lg:text-2xl nh:text-nhm nh:mt-3 nh:mb-2 nhm:text-2nhm nhm:mt-2 nhm:mb-2">
//           Member Status for User ID: {userId}
//         </h1>

//         <div className="mb-8 nh:mb-4 nhm:mb-8 lg:text-lg">
//           {latestCreditScore ? (
//             <p className="text-center text-nhm nh:text-nh nhm:text-nhm lg:text-md">
//               <b className="text-2xl">Eligibility:</b>{" "}
//               {latestCreditScore.is_eligible ? "Eligible" : "Not Eligible"}
//             </p>
//           ) : (
//             <p>Loading eligibility info...</p>
//           )}
//         </div>

//         <div className="flex flex-row nh:flex-row mb-8 lg:gap-40">
//           <div className="w-full nh:w-[1000px] lg:w-full lg:h-[400px] xl:h-[370px] 2xl:h-[400px] xl:w-[500px] 2xl:w-[900px] 2xl:ml-0 xl:-ml-4">
//             <BarChartComponent milkRecords={milkRecords} />
//           </div>

//           <div className="mt-8 nh:mt-0 nh:ml-8 nhm:ml-12 w-full">
//             <h2 className="text-3xl font-semibold nh:text-nh nhm:text-nhm mb-4">
//               Latest Credit Score Info
//             </h2>
//             {latestCreditScore ? (
//               <>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">
//                     Loan Range (KES):
//                   </strong>{" "}
//                   {latestCreditScore.loan_range || "N/A"}
//                 </p>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">
//                     Credit Score:
//                   </strong>{" "}
//                   {latestCreditScore.score || "N/A"}
//                 </p>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">
//                     Credit Worth:
//                   </strong>{" "}
//                   {latestCreditScore.credit_worthiness.toLowerCase() || "N/A"}
//                 </p>
//               </>
//             ) : (
//               <p>Loading credit score info...</p>
//             )}
//           </div>
//         </div>

//         <div className="overflow-x-auto mt-8 lg:px-4">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="py-2 px-2 lg:px-4 border-b-2 border-blue-600 text-left text-sm lg:text-md text-blue-600 font-bold">
//                   Date
//                 </th>
//                 <th className="py-2 px-2 lg:px-4 border-b-2 border-blue-600 text-left text-sm lg:text-md text-blue-600 font-bold">
//                   Credit Score
//                 </th>
//                 <th className="py-2 px-2 lg:px-4 border-b-2 border-blue-600 text-left text-sm lg:text-md text-blue-600 font-bold">
//                   Credit Worthiness
//                 </th>
//                 <th className="py-2 px-2 lg:px-4 border-b-2 border-blue-600 text-left text-sm lg:text-md text-blue-600 font-bold">
//                   Loan Range
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentCreditScores.map((score) => (
//                 <tr
//                   key={score.credit_score_id}
//                   className={score.credit_worthiness.toLowerCase()}
//                 >
//                   <td className="py-2 px-2 lg:px-4 border-b border-gray-200">
//                     {score.last_checked_date}
//                   </td>
//                   <td className="py-2 px-2 lg:px-4 border-b border-gray-200">
//                     {score.score}
//                   </td>
//                   <td
//                     className="py-2 px-2 lg:px-4 border-b border-gray-200"
//                     style={{ color: getColor(score.credit_worthiness) }}
//                   >
//                     {score.credit_worthiness.toLowerCase()}
//                   </td>
//                   <td className="py-2 px-2 lg:px-4 border-b border-gray-200">
//                     {score.loan_range}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

        
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => paginate(index + 1)}
//               className={`mx-1 px-3 py-1 border ${
//                 currentPage === index + 1
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-blue-500"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// const getColor = (worthiness: string) => {
//   switch (worthiness.toLowerCase()) {
//     case "high":
//       return "green";
//     case "good":
//       return "orange";
//     case "low":
//       return "red";
//     default:
//       return "black";
//   }
// };

// export default MemberPage;

"use client";
import React, { useState } from 'react';
import BarChartComponent from "../../components/BarChart";
import { useFetchCreditScores } from "../../../../hooks/useFetchCreditScores";
import { fetchMilkRecords } from "../../../../utils/fetchMilkRecords";
import { useEffect } from "react";
import Layout from "@/app/Layout";
import FarmerDetailsModal from '../../FarmerDetailsModal/page';
import { useRouter } from 'next/navigation';

interface MilkRecord {
  record_id: number;
  farmer_id: number;
  milk_quantity: number;
  price: number;
  date: string;
}

interface FarmerFormData {
  owns_car: string,
  owns_property: string,
  num_children: number,
  total_income: number,
  education_type: string,
  family_status: string,
  housing_type: string,
  age: number,
  employment_duration: number,
  number_of_family_members: number,
  total_dependents: number,
  is_long_employment: string
}

interface EligibilityResponse {
  prediction: boolean;
  probability: number;
}

const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
  const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(
    userId as string
  );
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const [isFarmerDetailsModalOpen, setIsFarmerDetailsModalOpen] = useState(false);
  const [farmerData, setFarmerData] = useState<Partial<FarmerFormData> | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await fetchMilkRecords();
        const filteredRecords = records.filter(
          (record: MilkRecord) => record.farmer_id === Number(userId)
        );
        setMilkRecords(filteredRecords);
      } catch (error) {
        console.error("Error fetching milk records:", error);
      }
    };

    fetchData();
  }, [userId]);

  const latestCreditScore = creditScores.sort(
    (a, b) =>
      new Date(b.last_checked_date).getTime() -
      new Date(a.last_checked_date).getTime()
  )[0];

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentCreditScores = creditScores.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleOpenFarmerDetailsModal = () => {
    setFarmerData({
      total_income: latestCreditScore?.total_income || 0,
      age: latestCreditScore?.age || 0,
      num_children: latestCreditScore?.num_children || 0,
      number_of_family_members: latestCreditScore?.number_of_family_members || 0,
      employment_duration: latestCreditScore?.employment_duration || 0,
      education_type: latestCreditScore?.education_type || '',
      owns_car: latestCreditScore?.owns_car || '',
      owns_property: latestCreditScore?.owns_property || '',
      family_status: latestCreditScore?.family_status || '',
      housing_type: latestCreditScore?.housing_type || '',
      is_long_employment: latestCreditScore?.is_long_employment || ''
    });
    setIsFarmerDetailsModalOpen(true);
  };

  const handleCloseFarmerDetailsModal = () => {
    setIsFarmerDetailsModalOpen(false);
  };

  const handleCheckEligibility = async (data: FarmerFormData) => {
    try {
      const transformedData = transformFormData(data);

      const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${errorText}`);
      }

      const result: EligibilityResponse = await response.json();

      const eligibilityData = {
        isEligible: result.prediction,
        probability: result.probability,
        lastCheckedDate: new Date().toISOString()
      };

      localStorage.setItem('eligibilityResult', JSON.stringify(eligibilityData));

      setIsFarmerDetailsModalOpen(false);
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push(`/eligibility-result?status=${result.prediction}&probability=${result.probability}`);

    } catch (error) {
      console.error('Error in form submission:', error);
      setError('root', {
        type: 'manual',
        message: 'An error occurred while checking eligibility'
      });
    }
  };

  const transformFormData = (data: FarmerFormData) => {
    return {
      ...data,
      owns_car: data.owns_car === 'Yes' ? 1 : 0,
      owns_property: data.owns_property === 'Yes' ? 1 : 0,
      education_type: data.education_type === 'Primary' ? 0 : data.education_type === 'Secondary' ? 1 : 2,
      family_status: data.family_status === 'Single' ? 0 : data.family_status === 'Married' ? 1 : 2,
      housing_type: data.housing_type === 'Owned' ? 1 : 0,
      is_long_employment: data.is_long_employment === 'Yes' ? 1 : 0,
    };
  };

  if (loadingCreditScores) return <p>Loading credit scores...</p>;
  if (!userId) return <p>Loading user information...</p>;

  const totalPages = Math.ceil(creditScores.length / recordsPerPage);

  return (
    <Layout>
      <div className="p-5 lg:ml-70 ml-40 nh:p-3 nh:ml-0 nhm:p-5 nhm:ml-4 h-screen overflow-auto lg:w-full max-w-7xl">
        <h1 className="text-2nhm mt-5 text-3xl font-bold mb-4 text-center lg:text-2xl nh:text-nh nh:mt-3 nh:mb-2 nhm:text-2nhm nhm:mt-2 nhm:mb-2">
          Member Status for User ID: {userId}
        </h1>

        <div className="mb-8 nh:mb-4 nhm:mb-8 lg:text-lg">
          {latestCreditScore ? (
            <p className="text-center text-nhm nh:text-nh nhm:text-nhm lg:text-md">
              <b className="text-2xl">Eligibility:</b>{" "}
              {latestCreditScore.is_eligible ? "Eligible" : "Not Eligible"}
            </p>
          ) : (
            <p>Loading eligibility info...</p>
          )}
          <button
            onClick={handleOpenFarmerDetailsModal}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block mx-auto mt-4"
          >
            Check Eligibility
          </button>
        </div>

        <div className="flex flex-row nh:flex-row mb-8 lg:gap-40">
          <div className="w-full nh:w-[1000px] lg:w-full lg:h-[400px] xl:h-[370px] 2xl:h-[400px] xl:w-[500px] 2xl:w-[900px] 2xl:ml-0 xl:-ml-4">
            <BarChartComponent milkRecords={milkRecords} />
          </div>

          <div className="mt-8 nh:mt-0 nh:ml-8 nhm:ml-12 w-full">
            <h2 className="text-3xl font-semibold nh:text-nh nhm:text-nhm mb-4">
              Latest Credit Score Info
            </h2>
            {latestCreditScore ? (
              <>
                <p className="mb-2">
                  <strong className="text-nh nh:text-base nhm:text-nh">
                    Credit Worth:
                  </strong>{" "}
                  {latestCreditScore.credit_worthiness.toLowerCase() || "N/A"}
                </p>
              </>
            ) : (
              <p>Loading credit score info...</p>
            )}
          </div>
        </div>

        <div className="overflow-x-auto mt-8 lg:px-4">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-2 lg:px-4 border-b-2 border-blue-600 text-left text-sm lg:text-md text-blue-600 font-bold">
                  Date
                </th>
                <th className="py-2 px-2 lg:px-4 border-b-2 border-blue-600 text-left text-sm lg:text-md text-blue-600 font-bold">
                  Credit Score
                </th>
                <th className="py-2 px-2 lg:px-4 border-b-2 border-blue-600 text-left text-sm lg:text-md text-blue-600 font-bold">
                  Credit Worthiness
                </th>
                <th className="py-2 px-2 lg:px-4 border-b-2 border-blue-600 text-left text-sm lg:text-md text-blue-600 font-bold">
                  Loan Range
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCreditScores.map((score) => (
                <tr
                  key={score.credit_score_id}
                  className={score.credit_worthiness.toLowerCase()}
                >
                  <td className="py-2 px-2 lg:px-4 border-b border-gray-200">
                    {score.last_checked_date}
                  </td>
                  <td className="py-2 px-2 lg:px-4 border-b border-gray-200">
                    {score.score}
                  </td>
                  <td
                    className="py-2 px-2 lg:px-4 border-b border-gray-200"
                    style={{ color: getColor(score.credit_worthiness) }}
                  >
                    {score.credit_worthiness.toLowerCase()}
                  </td>
                  <td className="py-2 px-2 lg:px-4 border-b border-gray-200">
                    {score.loan_range}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <FarmerDetailsModal
          isOpen={isFarmerDetailsModalOpen}
          onClose={handleCloseFarmerDetailsModal}
          farmerData={farmerData}
          onSubmit={handleCheckEligibility}
          milkRecords={milkRecords}
        />
      </div>
    </Layout>
  );
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

export default MemberPage;

function setError(arg0: string, arg1: { type: string; message: string; }) {
  throw new Error('Function not implemented.');
}
