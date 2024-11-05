// import React from 'react';
// import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// const EligibilityResultModal = ({ 
//   isOpen, 
//   onClose, 
//   eligibilityResult 
// }: { 
//   isOpen: boolean; 
//   onClose: () => void; 
//   eligibilityResult: { 
//     isEligible: boolean; 
//     qualifyingPoints: number | string; 
//   } | null; 
// }) => {
//   if (!isOpen || !eligibilityResult) return null;

//   const getStatusColor = (isEligible: boolean) => {
//     return isEligible ? 'bg-green-50' : 'bg-red-50';
//   };

//   const getStatusIcon = (isEligible: boolean) => {
//     return isEligible ? (
//       <CheckCircle2 className="w-6 h-6 text-green-600" />
//     ) : (
//       <XCircle className="w-6 h-6 text-red-600" />
//     );
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full transform transition-all">
//         <div className="p-6">
//           <div className="mb-4">
//             <Alert className={`${getStatusColor(eligibilityResult.isEligible)} border-none`}>
//               <div className="flex items-center gap-3">
//                 {getStatusIcon(eligibilityResult.isEligible)}
//                 <AlertTitle className="text-lg font-semibold">
//                   {eligibilityResult.isEligible ? 'Congratulations!' : 'Not Eligible'}
//                 </AlertTitle>
//               </div>
//               <AlertDescription className="mt-4 text-gray-700">
//                 {eligibilityResult.isEligible
//                   ? "Based on the provided information, the farmer qualifies for the loan program."
//                   : "Unfortunately, the farmer does not meet the eligibility criteria at this time."}
//               </AlertDescription>
//             </Alert>
//           </div>

//           <div className="mt-6 bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center gap-2 text-gray-600">
//               <AlertCircle className="w-5 h-5" />
//               <span className="font-medium">Qualifying Score</span>
//             </div>
//             <div className="mt-2 text-3xl font-bold text-gray-900">
//               {eligibilityResult.qualifyingPoints}
//               <span className="text-sm font-normal text-gray-500 ml-2">points</span>
//             </div>
//             <p className="mt-2 text-sm text-gray-600">
//               {eligibilityResult.isEligible
//                 ? "Score meets or exceeds the minimum requirement of 50 points"
//                 : "Minimum requirement: 50 points"}
//             </p>
//           </div>

//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 flex items-center gap-2"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EligibilityResultModal;