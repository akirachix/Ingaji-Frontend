// // "use client";

// // import BarChartComponent from "@/app/(cooperative)/cooperative/components/BarChart"; // Ensure correct import path
// // import { useFetchCreditScores } from "@/app/hooks/useFetchCreditScores";
// // import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords"; // Ensure this fetch function works as expected
// // import { useEffect, useState } from "react";
// // import Layout from "@/app/components/Layout";

// // interface MilkRecord {
// //   record_id: number;
// //   farmer_id: number;
// //   milk_quantity: number;
// //   price: number;
// //   date: string;
// // }

// // // interface CreditScore {
// // //   credit_score_id: number;
// // //   score: number;
// // //   credit_worthiness: string;
// // //   loan_range: string;
// // //   last_checked_date: string;
// // //   is_eligible: boolean;
// // //   farmer_id: number;
// // // }

// // const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
// //   const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
// //   const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(userId as string);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const records = await fetchMilkRecords();
// //         const filteredRecords = records.filter(
// //           (record: MilkRecord) => record.farmer_id === Number(userId)
// //         );
// //         setMilkRecords(filteredRecords);
// //       } catch (error) {
// //         console.error("Error fetching milk records:", error);
// //       }
// //     };

// //     fetchData();
// //   }, [userId]);

// //   const latestCreditScore = creditScores.sort(
// //     (a, b) =>
// //       new Date(b.last_checked_date).getTime() -
// //       new Date(a.last_checked_date).getTime()
// //   )[0];

// //   if (loadingCreditScores) return <p>Loading credit scores...</p>;
// //   if (!userId) return <p>Loading user information...</p>;

// //   console.log({ milkRecords });
// //   return (
// //     <Layout>
// //       <div className="p-5 ml-56 nh:p-3 nh:ml-36 ">
// //         <h1 className="text-2nhm mt-10 font-bold mb-4 text-center nh:text-[1.5rem] nh:mt-5 nh:mb-2">
// //           Member Status for User ID: {userId}
// //         </h1>
// //         <div className="mb-16 nh:mb-8">
// //           {latestCreditScore ? (
// //             <p className="text-center text-2nhm nh:text-[1rem]">
// //               <b>Eligibility:</b>{" "}
// //               {latestCreditScore.is_eligible ? "Eligible" : "Not Eligible"}
// //             </p>
// //           ) : (
// //             <p>Loading eligibility info...</p>
// //           )}
// //         </div>
// //         <div className="flex mb-8">
// //           <div className="flex-shrink-0 nh:flex-col">
// //             <BarChartComponent milkRecords={milkRecords} width={700} height={350} />
// //           </div>
// //           <div className="ml-24 mt-20">
// //             <h2 className="text-1.5nhm font-semibold">Latest Credit Score Info</h2>
// //             {latestCreditScore ? (
// //               <>
// //                 <p>
// //                   <strong className="text-1.5nhm">Loan Range (KES):</strong>{" "}
// //                   {latestCreditScore.loan_range || "N/A"}
// //                 </p>
// //                 <p>
// //                   <strong className="text-1.5nhm">Credit Score:</strong>{" "}
// //                   {latestCreditScore.score || "N/A"}
// //                 </p>
// //                 <p>
// //                   <strong className="text-1.5nhm">Credit Worth:</strong>{" "}
// //                   {latestCreditScore.credit_worthiness.toLowerCase() || "N/A"}
// //                 </p>
// //               </>
// //             ) : (
// //               <p>Loading credit score info...</p>
// //             )}
// //           </div>
// //         </div>
// //         <table className="min-w-full bg-white border border-gray-200">
// //           <thead>
// //             <tr>
// //               <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
// //                 Date
// //               </th>
// //               <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
// //                 Credit Score
// //               </th>
// //               <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
// //                 Credit Worthiness
// //               </th>
// //               <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
// //                 Loan Range
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {creditScores.map((score) => (
// //               <tr key={score.credit_score_id} className={score.credit_worthiness.toLowerCase()}>
// //                 <td className="py-2 px-4 border-b border-gray-200">
// //                   {score.last_checked_date}
// //                 </td>
// //                 <td className="py-2 px-4 border-b border-gray-200">
// //                   {score.score}
// //                 </td>
// //                 <td className="py-2 px-4 border-b border-gray-200" style={{ color: getColor(score.credit_worthiness) }}>
// //                   {score.credit_worthiness.toLowerCase()}
// //                 </td>
// //                 <td className="py-2 px-4 border-b border-gray-200">
// //                   {score.loan_range}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </Layout>
// //   );
// // };

// // const getColor = (worthiness: string) => {
// //   switch (worthiness.toLowerCase()) {
// //     case "high":
// //       return "green";
// //     case "good":
// //       return "orange";
// //     case "low":
// //       return "red";
// //     default:
// //       return "black";
// //   }
// // };

// // export default MemberPage;


// // "use client";

// // import BarChartComponent from "@/app/(cooperative)/cooperative/components/BarChart";
// // import { useFetchCreditScores } from "@/app/hooks/useFetchCreditScores";
// // import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";
// // import { useEffect, useState } from "react";
// // import Layout from "@/app/components/Layout";

// // interface MilkRecord {
// //   record_id: number;
// //   farmer_id: number;
// //   milk_quantity: number;
// //   price: number;
// //   date: string;
// // }

// // const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
// //   const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
// //   const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(userId as string);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const records = await fetchMilkRecords();
// //         const filteredRecords = records.filter(
// //           (record: MilkRecord) => record.farmer_id === Number(userId)
// //         );
// //         setMilkRecords(filteredRecords);
// //       } catch (error) {
// //         console.error("Error fetching milk records:", error);
// //       }
// //     };

// //     fetchData();
// //   }, [userId]);

// //   const latestCreditScore = creditScores.sort(
// //     (a, b) =>
// //       new Date(b.last_checked_date).getTime() -
// //       new Date(a.last_checked_date).getTime()
// //   )[0];

// //   if (loadingCreditScores) return <p>Loading credit scores...</p>;
// //   if (!userId) return <p>Loading user information...</p>;

// //   return (
// //     <Layout>
// //       <div className="p-5 ml-56 nh:p-3 nh:ml-48 nhm:p-5 nhm:ml-10 h-screen overflow-auto">
// //         <h1 className="text-2nhm mt-5 font-bold mb-4 text-center nh:text-nhm nh:mt-3 nh:mb-2 nhm:text-2nhm nhm:mt-5 nhm:mb-4">
// //           Member Status for User ID: {userId}
// //         </h1>
// //         <div className="mb-8 nh:mb-4 nhm:mb-8">
// //           {latestCreditScore ? (
// //             <p className="text-center text-nhm nh:text-nh nhm:text-nhm">
// //               <b>Eligibility:</b>{" "}
// //               {latestCreditScore.is_eligible ? "Eligible" : "Not Eligible"}
// //             </p>
// //           ) : (
// //             <p>Loading eligibility info...</p>
// //           )}
// //         </div>
// //         <div className="flex flex-col nh:flex-row mb-8 nh:mb-4 nhm:mb-8">
// //           <div className="w-full nh:w-2/3 nhm:w-3/4">
// //             <BarChartComponent milkRecords={milkRecords} width={600} height={300} />
// //           </div>
// //           <div className="mt-8 nh:mt-0 nh:ml-8 nhm:ml-12 w-full nh:w-1/3 nhm:w-1/4">
// //             <h2 className="text-nhm font-semibold nh:text-nh nhm:text-nhm mb-4">Latest Credit Score Info</h2>
// //             {latestCreditScore ? (
// //               <>
// //                 <p className="mb-2">
// //                   <strong className="text-nh nh:text-base nhm:text-nh">Loan Range (KES):</strong>{" "}
// //                   {latestCreditScore.loan_range || "N/A"}
// //                 </p>
// //                 <p className="mb-2">
// //                   <strong className="text-nh nh:text-base nhm:text-nh">Credit Score:</strong>{" "}
// //                   {latestCreditScore.score || "N/A"}
// //                 </p>
// //                 <p className="mb-2">
// //                   <strong className="text-nh nh:text-base nhm:text-nh">Credit Worth:</strong>{" "}
// //                   {latestCreditScore.credit_worthiness.toLowerCase() || "N/A"}
// //                 </p>
// //               </>
// //             ) : (
// //               <p>Loading credit score info...</p>
// //             )}
// //           </div>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full bg-white border border-gray-200">
// //             <thead>
// //               <tr>
// //                 <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600 nh:px-2 nhm:px-4">
// //                   Date
// //                 </th>
// //                 <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600 nh:px-2 nhm:px-4">
// //                   Credit Score
// //                 </th>
// //                 <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600 nh:px-2 nhm:px-4">
// //                   Credit Worthiness
// //                 </th>
// //                 <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600 nh:px-2 nhm:px-4">
// //                   Loan Range
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {creditScores.map((score) => (
// //                 <tr key={score.credit_score_id} className={score.credit_worthiness.toLowerCase()}>
// //                   <td className="py-2 px-4 border-b border-gray-200 nh:px-2 nhm:px-4">
// //                     {score.last_checked_date}
// //                   </td>
// //                   <td className="py-2 px-4 border-b border-gray-200 nh:px-2 nhm:px-4">
// //                     {score.score}
// //                   </td>
// //                   <td className="py-2 px-4 border-b border-gray-200 nh:px-2 nhm:px-4" style={{ color: getColor(score.credit_worthiness) }}>
// //                     {score.credit_worthiness.toLowerCase()}
// //                   </td>
// //                   <td className="py-2 px-4 border-b border-gray-200 nh:px-2 nhm:px-4">
// //                     {score.loan_range}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // const getColor = (worthiness: string) => {
// //   switch (worthiness.toLowerCase()) {
// //     case "high":
// //       return "green";
// //     case "good":
// //       return "orange";
// //     case "low":
// //       return "red";
// //     default:
// //       return "black";
// //   }
// // };

// // export default MemberPage;



// "use client";

// import BarChartComponent from "@/app/(cooperative)/cooperative/components/BarChart";
// import { useFetchCreditScores } from "@/app/hooks/useFetchCreditScores";
// import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";
// import { useEffect, useState } from "react";
// import Layout from "@/app/components/Layout";

// interface MilkRecord {
//   record_id: number;
//   farmer_id: number;
//   milk_quantity: number;
//   price: number;
//   date: string;
// }

// const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
//   const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
//   const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(userId as string);

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

//   if (loadingCreditScores) return <p>Loading credit scores...</p>;
//   if (!userId) return <p>Loading user information...</p>;

//   return (
//     <Layout>
//       <div className="p-5 ml-56 nh:p-3 nh:ml-36">
//         <h1 className="text-2nhm mt-10 font-bold mb-4 text-center nh:text-[1.5rem] nh:mt-5 nh:mb-2">
//           Member Status for User ID: {userId}
//         </h1>
//         <div className="flex flex-row nh:flex-row mb-16 nh:mb-8">
//           <div className="flex-shrink-0 nh:flex-grow">
//             {/* Reduce the width and height of the chart */}
//             <BarChartComponent milkRecords={milkRecords} width={500} height={300} />
//           </div>
//           <div className="ml-16 mt-20 nh:ml-6 nh:mt-0">
//             <h2 className="text-1.5nhm font-semibold">Latest Credit Score Info</h2>
//             {latestCreditScore ? (
//               <>
//                 <p>
//                   <strong className="text-1.5nhm">Loan Range (KES):</strong>{" "}
//                   {latestCreditScore.loan_range || "N/A"}
//                 </p>
//                 <p>
//                   <strong className="text-1.5nhm">Credit Score:</strong>{" "}
//                   {latestCreditScore.score || "N/A"}
//                 </p>
//                 <p>
//                   <strong className="text-1.5nhm">Credit Worth:</strong>{" "}
//                   {latestCreditScore.credit_worthiness.toLowerCase() || "N/A"}
//                 </p>
//               </>
//             ) : (
//               <p>Loading credit score info...</p>
//             )}
//           </div>
//         </div>
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
//                 Date
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
//                 Credit Score
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
//                 Credit Worthiness
//               </th>
//               <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-blue-600">
//                 Loan Range
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {creditScores.map((score) => (
//               <tr key={score.credit_score_id} className={score.credit_worthiness.toLowerCase()}>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {score.last_checked_date}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {score.score}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200" style={{ color: getColor(score.credit_worthiness) }}>
//                   {score.credit_worthiness.toLowerCase()}
//                 </td>
//                 <td className="py-2 px-4 border-b border-gray-200">
//                   {score.loan_range}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
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

// "use client";

// import BarChartComponent from "@/app/(cooperative)/cooperative/components/BarChart";
// import { useFetchCreditScores } from "@/app/hooks/useFetchCreditScores";
// import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";
// import { useEffect, useState } from "react";
// import Layout from "@/app/components/Layout";

// interface MilkRecord {
//   record_id: number;
//   farmer_id: number;
//   milk_quantity: number;
//   price: number;
//   date: string;
// }

// const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
//   const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
//   const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(userId as string);
//   const [currentPage, setCurrentPage] = useState(1); // For pagination
//   const recordsPerPage = 5; // Change this value to adjust the number of records per page

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

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentCreditScores = creditScores.slice(indexOfFirstRecord, indexOfLastRecord);

//   // Change page
//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   if (loadingCreditScores) return <p>Loading credit scores...</p>;
//   if (!userId) return <p>Loading user information...</p>;

//   const totalPages = Math.ceil(creditScores.length / recordsPerPage);

//   return (
//     <Layout>
//       <div className="p-5 lg:ml-70 nh:p-3 nh:ml-0 nhm:p-5 nhm:ml-4 h-screen overflow-hidden lg:w-[800px] 2xl:w-[1500px] xl:w-[1000px]">
//         <h1 className="text-2nhm mt-5 text-3xl font-bold mb-4 text-center lg:text-2xl nh:text-nhm nh:mt-3 nh:mb-2 nhm:text-2nhm nhm:mt-2 nhm:mb-2">
//           Member Status for User ID: {userId}
//         </h1>

//         <div className="mb-8 nh:mb-4 nhm:mb-8 lg:text-lg">
//           {latestCreditScore ? (
//             <p className="text-center text-nhm nh:text-nh nhm:text-nhm lg:text-md">
//               <b className="text-2xl">Eligibility:</b> {latestCreditScore.is_eligible ? "Eligible" : "Not Eligible"}
//             </p>
//           ) : (
//             <p>Loading eligibility info...</p>
//           )}
//         </div>
//         <div className="flex flex-row nh:flex-row mb-8 lg:gap-40">
//           <div className="w-full nh:w-2/3 lg:w-50 lg:h-[100px] xl:h-[370px] 2xl:h-[400px] xl:w-[500px] 2xl:w-[900px] 2xl:ml-0 xl:-ml-4">
//             <BarChartComponent milkRecords={milkRecords} width={750} height={400}/>
//           </div>
//           <div className="mt-8 nh:mt-0 nh:ml-8 nhm:ml-12 w-full">
//             <h2 className="text-3xl font-semibold nh:text-nh nhm:text-nhm mb-4">Latest Credit Score Info</h2>
//             {latestCreditScore ? (
//               <>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">Loan Range (KES):</strong>{" "}
//                   {latestCreditScore.loan_range || "N/A"}
//                 </p>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">Credit Score:</strong>{" "}
//                   {latestCreditScore.score || "N/A"}
//                 </p>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">Credit Worth:</strong>{" "}
//                   {latestCreditScore.credit_worthiness.toLowerCase() || "N/A"}
//                 </p>
//               </>
//             ) : (
//               <p>Loading credit score info...</p>
//             )}
//           </div>
//         </div>

//         <div className="overflow-x-auto mt-8 lg:px-4">
//           <table className="w-full bg-white border border-gray-200">
//           <thead>
//           <tr>
//           <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-blue-600 font-bold">Date</th>
//           <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-blue-600 font-bold">Credit Score</th>
//           <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-blue-600 font-bold">Credit Worthiness</th>
//           <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-blue-600 font-bold">Loan Range</th>
//           </tr>
//           </thead>
//             <tbody>
//               {currentCreditScores.map((score) => (
//                 <tr key={score.credit_score_id} className={score.credit_worthiness.toLowerCase()}>
//                   <td className="py-2 px-4 border-b border-gray-200">{score.last_checked_date}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{score.score}</td>
//                   <td className="py-2 px-4 border-b border-gray-200" style={{ color: getColor(score.credit_worthiness) }}>
//                     {score.credit_worthiness.toLowerCase()}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">{score.loan_range}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-center mt-4">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => paginate(index + 1)}
//               className={`mx-1 px-3 py-1 border ${
//                 currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"
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

// "use client";

// // import BarChartComponent from "@/app/cooperative/components/BarChart";
// import BarChartComponent from "../../components/BarChart";
// import { useFetchCreditScores } from "@/app/hooks/useFetchCreditScores";
// import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";
// import { useEffect, useState } from "react";
// import Layout from "@/app/components/Layout";

// interface MilkRecord {
//   record_id: number;
//   farmer_id: number;
//   milk_quantity: number;
//   price: number;
//   date: string;
// }

// const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
//   const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
//   const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(userId as string);
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
//     (a, b) => new Date(b.last_checked_date).getTime() - new Date(a.last_checked_date).getTime()
//   )[0];

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentCreditScores = creditScores.slice(indexOfFirstRecord, indexOfLastRecord);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   if (loadingCreditScores) return <p>Loading credit scores...</p>;
//   if (!userId) return <p>Loading user information...</p>;

//   const totalPages = Math.ceil(creditScores.length / recordsPerPage);

//   return (
//     <Layout>
//       <div className="p-5 lg:ml-70 nh:p-3 nh:ml-0 nhm:p-5 nhm:ml-4 h-screen overflow-hidden lg:w-[800px] 2xl:w-[1500px] xl:w-[1000px]">
//         <h1 className="text-2nhm mt-5 text-3xl font-bold mb-4 text-center lg:text-2xl nh:text-nhm nh:mt-3 nh:mb-2 nhm:text-2nhm nhm:mt-2 nhm:mb-2">
//           Member Status for User ID: {userId}
//         </h1>

//         <div className="mb-8 nh:mb-4 nhm:mb-8 lg:text-lg">
//           {latestCreditScore ? (
//             <p className="text-center text-nhm nh:text-nh nhm:text-nhm lg:text-md">
//               <b className="text-2xl">Eligibility:</b> {latestCreditScore.is_eligible ? "Eligible" : "Not Eligible"}
//             </p>
//           ) : (
//             <p>Loading eligibility info...</p>
//           )}
//         </div>
        
//         <div className="flex flex-row nh:flex-row mb-8 lg:gap-40">
//           <div className="w-full nh:w-2/3 lg:w-50 lg:h-[100px] xl:h-[370px] 2xl:h-[400px] xl:w-[500px] 2xl:w-[900px] 2xl:ml-0 xl:-ml-4">
//             <BarChartComponent milkRecords={milkRecords} width={750} height={400}/>
//           </div>
//           <div className="mt-8 nh:mt-0 nh:ml-8 nhm:ml-12 w-full">
//             <h2 className="text-3xl font-semibold nh:text-nh nhm:text-nhm mb-4">Latest Credit Score Info</h2>
//             {latestCreditScore ? (
//               <>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">Loan Range (KES):</strong>{" "}
//                   {latestCreditScore.loan_range || "N/A"}
//                 </p>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">Credit Score:</strong>{" "}
//                   {latestCreditScore.score || "N/A"}
//                 </p>
//                 <p className="mb-2">
//                   <strong className="text-nh nh:text-base nhm:text-nh">Credit Worth:</strong>{" "}
//                   {latestCreditScore.credit_worthiness.toLowerCase() || "N/A"}
//                 </p>
//               </>
//             ) : (
//               <p>Loading credit score info...</p>
//             )}
//           </div>
//         </div>

//         <div className="overflow-x-auto mt-8 lg:px-4">
//           <table className="w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-blue-600 font-bold">Date</th>
//                 <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-blue-600 font-bold">Credit Score</th>
//                 <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-blue-600 font-bold">Credit Worthiness</th>
//                 <th className="py-2 px-4 border-b-2 border-blue-600 text-left text-blue-600 font-bold">Loan Range</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentCreditScores.map((score) => (
//                 <tr key={score.credit_score_id} className={score.credit_worthiness.toLowerCase()}>
//                   <td className="py-2 px-4 border-b border-gray-200">{score.last_checked_date}</td>
//                   <td className="py-2 px-4 border-b border-gray-200">{score.score}</td>
//                   <td className="py-2 px-4 border-b border-gray-200" style={{ color: getColor(score.credit_worthiness) }}>
//                     {score.credit_worthiness.toLowerCase()}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">{score.loan_range}</td>
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
//                 currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"
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

import BarChartComponent from "@/app/(cooperative)/cooperative/components/BarChart";
import { useFetchCreditScores } from "@/app/hooks/useFetchCreditScores";
import { fetchMilkRecords } from "@/app/utils/fetchMilkRecords";
import { useEffect, useState } from "react";
import Layout from "@/app/components/Layout";

interface MilkRecord {
  record_id: number;
  farmer_id: number;
  milk_quantity: number;
  price: number;
  date: string;
}

const MemberPage = ({ params: { userId } }: { params: { userId: string } }) => {
  const [milkRecords, setMilkRecords] = useState<MilkRecord[]>([]);
  const { creditScores, loading: loadingCreditScores } = useFetchCreditScores(userId as string);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

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

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentCreditScores = creditScores.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loadingCreditScores) return <p>Loading credit scores...</p>;
  if (!userId) return <p>Loading user information...</p>;

  const totalPages = Math.ceil(creditScores.length / recordsPerPage);

  return (
    <Layout>
      <div className="p-5 lg:ml-70 ml-40 nh:p-3 nh:ml-0 nhm:p-5 nhm:ml-4 h-screen overflow-auto lg:w-full max-w-7xl">
        <h1 className="text-2nhm mt-5 text-3xl font-bold mb-4 text-center lg:text-2xl nh:text-nhm nh:mt-3 nh:mb-2 nhm:text-2nhm nhm:mt-2 nhm:mb-2">
          Member Status for User ID: {userId}
        </h1>

        <div className="mb-8 nh:mb-4 nhm:mb-8 lg:text-lg">
          {latestCreditScore ? (
            <p className="text-center text-nhm nh:text-nh nhm:text-nhm lg:text-md">
              <b className="text-2xl">Eligibility:</b> {latestCreditScore.is_eligible ? "Eligible" : "Not Eligible"}
            </p>
          ) : (
            <p>Loading eligibility info...</p>
          )}
        </div>

        <div className="flex flex-row nh:flex-row mb-8 lg:gap-40">
          <div className="w-full nh:w-[1000px] lg:w-full lg:h-[400px] xl:h-[370px] 2xl:h-[400px] xl:w-[500px] 2xl:w-[900px] 2xl:ml-0 xl:-ml-4">
            <BarChartComponent milkRecords={milkRecords} />
          </div>
          
          <div className="mt-8 nh:mt-0 nh:ml-8 nhm:ml-12 w-full">
            <h2 className="text-3xl font-semibold nh:text-nh nhm:text-nhm mb-4">Latest Credit Score Info</h2>
            {latestCreditScore ? (
              <>
                <p className="mb-2">
                  <strong className="text-nh nh:text-base nhm:text-nh">Loan Range (KES):</strong>{" "}
                  {latestCreditScore.loan_range || "N/A"}
                </p>
                <p className="mb-2">
                  <strong className="text-nh nh:text-base nhm:text-nh">Credit Score:</strong>{" "}
                  {latestCreditScore.score || "N/A"}
                </p>
                <p className="mb-2">
                  <strong className="text-nh nh:text-base nhm:text-nh">Credit Worth:</strong>{" "}
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
                <tr key={score.credit_score_id} className={score.credit_worthiness.toLowerCase()}>
                  <td className="py-2 px-2 lg:px-4 border-b border-gray-200">{score.last_checked_date}</td>
                  <td className="py-2 px-2 lg:px-4 border-b border-gray-200">{score.score}</td>
                  <td className="py-2 px-2 lg:px-4 border-b border-gray-200" style={{ color: getColor(score.credit_worthiness) }}>
                    {score.credit_worthiness.toLowerCase()}
                  </td>
                  <td className="py-2 px-2 lg:px-4 border-b border-gray-200">{score.loan_range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
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
