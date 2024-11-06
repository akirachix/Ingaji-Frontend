// "use client";
// import React from 'react';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useRouter } from 'next/navigation';

// // Define interfaces for the form data and props
// interface FarmerFormData {
//   totalIncome: number;
//   age: number;
//   education: string;
//   carOwnership: string;
//   numberOfChildren: number;
//   totalIncome2: number;
//   gender: string;
//   familyMembers: number;
//   familyStatus: string;
//   housingType: string;
//   yearsEmployed: number;  // Changed from daysEmployed
//   occupationType: string;
// }

// interface FarmerDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   farmerData?: Partial<FarmerFormData>;
// }

// interface EligibilityResponse {
//   userId: string;
//   isEligible: boolean;
//   creditScore: {
//     score: number;
//     creditWorthiness: string;
//     loanRange: string;
//     lastCheckedDate: string;
//   };
// }

// const schema = yup.object().shape({
//   totalIncome: yup.number().required("Total income is required").positive("Must be a positive number"),
//   age: yup.number().required("Age is required").positive().integer(),
//   education: yup.string().required("Education is required"),
//   carOwnership: yup.string().required("Car ownership is required"),
//   numberOfChildren: yup.number().required("Number of children is required").min(0, "Cannot be less than 0"),
//   totalIncome2: yup.number().required("Total income is required").positive("Must be a positive number"),
//   gender: yup.string().required("Gender is required"),
//   familyMembers: yup.number().required("Number of family members is required").positive().integer(),
//   familyStatus: yup.string().required("Family status is required"),
//   housingType: yup.string().required("Housing type is required"),
//   yearsEmployed: yup.number().required("Years employed is required").min(0, "Cannot be less than 0").max(100, "Must be less than 100 years"), // Updated validation
//   occupationType: yup.string().required("Occupation type is required")
// });

// const FarmerDetailsModal: React.FC<FarmerDetailsModalProps> = ({ isOpen, onClose, farmerData }) => {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<FarmerFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: farmerData,
//   });

//   const onSubmit = async (data: FarmerFormData) => {
//     try {
//       const response = await fetch('/api/check-eligibility', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to check eligibility');
//       }

//       const result: EligibilityResponse = await response.json();
      
//       if (result.userId) {
//         // Store initial credit score data in localStorage or state management solution
//         localStorage.setItem('initialCreditScore', JSON.stringify({
//           score: result.creditScore.score,
//           creditWorthiness: result.creditScore.creditWorthiness,
//           loanRange: result.creditScore.loanRange,
//           lastCheckedDate: result.creditScore.lastCheckedDate,
//           isEligible: result.isEligible
//         }));

//         // Close the modal
//         onClose();
        
//         // Navigate to the member page with the user ID
//         router.push(`/member/${result.userId}`);
//       } else {
//         setError('root', {
//           type: 'manual',
//           message: 'Failed to process eligibility check'
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setError('root', {
//         type: 'manual',
//         message: 'An error occurred while checking eligibility'
//       });
//     }
//   };

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
//       <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto m-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Farmer Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Total income
//               </label>
//               <input
//                 {...register("totalIncome")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.totalIncome && <p className="text-red-500 text-sm">{errors.totalIncome.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Age
//               </label>
//               <input
//                 {...register("age")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Education Level
//               </label>
//               <select
//                 {...register("education")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Primary">Primary</option>
//                 <option value="Secondary">Secondary</option>
//                 <option value="Tertiary">Tertiary</option>
//               </select>
//               {errors.education && <p className="text-red-500 text-sm">{errors.education.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Car Ownership
//               </label>
//               <select
//                 {...register("carOwnership")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//               {errors.carOwnership && <p className="text-red-500 text-sm">{errors.carOwnership.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Number of children
//               </label>
//               <input
//                 {...register("numberOfChildren")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.numberOfChildren && <p className="text-red-500 text-sm">{errors.numberOfChildren.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Total income (secondary)
//               </label>
//               <input
//                 {...register("totalIncome2")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.totalIncome2 && <p className="text-red-500 text-sm">{errors.totalIncome2.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <select
//                 {...register("gender")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Number of family members
//               </label>
//               <input
//                 {...register("familyMembers")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.familyMembers && <p className="text-red-500 text-sm">{errors.familyMembers.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Family status
//               </label>
//               <select
//                 {...register("familyStatus")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Single">Single</option>
//                 <option value="Married">Married</option>
//                 <option value="Divorced">Divorced</option>
//               </select>
//               {errors.familyStatus && <p className="text-red-500 text-sm">{errors.familyStatus.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Years employed
//               </label>
//               <input
//                 {...register("yearsEmployed")}
//                 type="number"
//                 step="0.1"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 placeholder="Enter years of employment"
//               />
//               {errors.yearsEmployed && <p className="text-red-500 text-sm">{errors.yearsEmployed.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Housing type
//               </label>
//               <select
//                 {...register("housingType")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Rented">Rented</option>
//                 <option value="Owned">Owned</option>
//               </select>
//               {errors.housingType && <p className="text-red-500 text-sm">{errors.housingType.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Occupation type
//               </label>
//               <select
//                 {...register("occupationType")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Farmer">Farmer</option>
//                 <option value="Farm Worker">Farm Worker</option>
//               </select>
//               {errors.occupationType && <p className="text-red-500 text-sm">{errors.occupationType.message}</p>}
//             </div>
//           </div>

//            <div className="flex justify-end space-x-4 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             >
//               Check Eligibility
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FarmerDetailsModal;



// "use client";
// import React, { useState } from 'react';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useRouter } from 'next/navigation';

// // Define interfaces for the form data and props
// interface FarmerFormData {
//   totalIncome: number;
//   age: number;
//   education: string;
//   carOwnership: string;
//   numberOfChildren: number;
//   totalIncome2: number;
//   gender: string;
//   familyMembers: number;
//   familyStatus: string;
//   housingType: string;
//   daysEmployed: number;
//   occupationType: string;
// }

// interface FarmerDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   farmerData?: Partial<FarmerFormData>;
// }

// interface EligibilityResponse {
//   userId: string;
//   isEligible: boolean;
//   creditScore: {
//     score: number;
//     creditWorthiness: string;
//     loanRange: string;
//     lastCheckedDate: string;
//   };
// }

// const schema = yup.object().shape({
//   totalIncome: yup.number().required("Total income is required").positive("Must be a positive number"),
//   age: yup.number().required("Age is required").positive().integer(),
//   education: yup.string().required("Education is required"),
//   carOwnership: yup.string().required("Car ownership is required"),
//   numberOfChildren: yup.number().required("Number of children is required").min(0, "Cannot be less than 0"),
//   totalIncome2: yup.number().required("Total income is required").positive("Must be a positive number"),
//   gender: yup.string().required("Gender is required"),
//   familyMembers: yup.number().required("Number of family members is required").positive().integer(),
//   familyStatus: yup.string().required("Family status is required"),
//   housingType: yup.string().required("Housing type is required"),
//   daysEmployed: yup.number().required("Days employed is required"),
//   occupationType: yup.string().required("Occupation type is required")
// });

// const FarmerDetailsModal = ({ isOpen, onClose, farmerData }) => {
//     const router = useRouter();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [apiError, setApiError] = useState('');
    
//     const {
//       register,
//       handleSubmit,
//       formState: { errors },
//       setError,
//     } = useForm({
//       resolver: yupResolver(schema),
//       defaultValues: farmerData,
//     });
  
//     const onSubmit = async (data) => {
//       setIsSubmitting(true);
//       setApiError('');
  
//       try {
//         const response = await fetch('/api/check-eligibility', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
  
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
  
//         const result = await response.json();
        
//         if (result.userId) {
//           // Store credit score data in localStorage
//           localStorage.setItem('initialCreditScore', JSON.stringify({
//             score: result.creditScore.score,
//             creditWorthiness: result.creditScore.creditWorthiness,
//             loanRange: result.creditScore.loanRange,
//             lastCheckedDate: result.creditScore.lastCheckedDate,
//             isEligible: result.isEligible
//           }));
  
//           // Show success message before redirecting
//           const eligibilityStatus = result.isEligible ? 'Eligible' : 'Not Eligible';
//           const creditScore = result.creditScore.score;
          
//           alert(`Eligibility Check Complete!\nStatus: ${eligibilityStatus}\nCredit Score: ${creditScore}`);
  
//           // Close the modal
//           onClose();
          
//           // Navigate to the member page
//           router.push(`/member/${result.userId}`);
//         } else {
//           setApiError('Failed to process eligibility check');
//         }
//       } catch (error) {
//         console.error('Error submitting form:', error);
//         setApiError('An error occurred while checking eligibility. Please try again.');
//       } finally {
//         setIsSubmitting(false);
//       }
//     };
  
//     if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
//       <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto m-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Farmer Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ×
//           </button>
//         </div>

//         {apiError && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {apiError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Total income
//               </label>
//               <input
//                 {...register("totalIncome")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.totalIncome && <p className="text-red-500 text-sm">{errors.totalIncome.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Age
//               </label>
//               <input
//                 {...register("age")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Education Level
//               </label>
//               <select
//                 {...register("education")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Primary">Primary</option>
//                 <option value="Secondary">Secondary</option>
//                 <option value="Tertiary">Tertiary</option>
//               </select>
//               {errors.education && <p className="text-red-500 text-sm">{errors.education.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Car Ownership
//               </label>
//               <select
//                 {...register("carOwnership")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//               {errors.carOwnership && <p className="text-red-500 text-sm">{errors.carOwnership.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Number of children
//               </label>
//               <input
//                 {...register("numberOfChildren")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.numberOfChildren && <p className="text-red-500 text-sm">{errors.numberOfChildren.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Total income (secondary)
//               </label>
//               <input
//                 {...register("totalIncome2")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.totalIncome2 && <p className="text-red-500 text-sm">{errors.totalIncome2.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <select
//                 {...register("gender")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//               {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Number of family members
//               </label>
//               <input
//                 {...register("familyMembers")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.familyMembers && <p className="text-red-500 text-sm">{errors.familyMembers.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Family status
//               </label>
//               <select
//                 {...register("familyStatus")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Single">Single</option>
//                 <option value="Married">Married</option>
//                 <option value="Divorced">Divorced</option>
//               </select>
//               {errors.familyStatus && <p className="text-red-500 text-sm">{errors.familyStatus.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Days employed
//               </label>
//               <input
//                 {...register("daysEmployed")}
//                 type="number"
//                 className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//               />
//               {errors.daysEmployed && <p className="text-red-500 text-sm">{errors.daysEmployed.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Housing type
//               </label>
//               <select
//                 {...register("housingType")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Rented">Rented</option>
//                 <option value="Owned">Owned</option>
//               </select>
//               {errors.housingType && <p className="text-red-500 text-sm">{errors.housingType.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Occupation type
//               </label>
//               <select
//                 {...register("occupationType")}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select</option>
//                 <option value="Farmer">Farmer</option>
//                 <option value="Farm Worker">Farm Worker</option>
//               </select>
//               {errors.occupationType && <p className="text-red-500 text-sm">{errors.occupationType.message}</p>}
//             </div>
//           </div>
//           <div className="flex justify-end space-x-4 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Checking Eligibility...
//                 </span>
//               ) : (
//                 'Check Eligibility'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FarmerDetailsModal;





// "use client";
// import React, { useState } from 'react';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useRouter } from 'next/navigation';

// // Define interfaces for the form data and props
// interface FarmerFormData {
//   totalIncome: number;
//   age: number;
//   education: string;
//   carOwnership: string;
//   numberOfChildren: number;
//   totalIncome2: number;
//   gender: string;
//   familyMembers: number;
//   familyStatus: string;
//   housingType: string;
//   daysEmployed: number;
//   occupationType: string;
// }

// interface FarmerDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   farmerData?: Partial<FarmerFormData>;
// }

// interface EligibilityResponse {
//   userId: string;
//   isEligible: boolean;
//   creditScore: {
//     score: number;
//     creditWorthiness: string;
//     loanRange: string;
//     lastCheckedDate: string;
//   };
// }

// // Validation schema using Yup
// const schema = yup.object().shape({
//   totalIncome: yup.number().required("Total income is required").positive("Must be a positive number"),
//   age: yup.number().required("Age is required").positive().integer(),
//   education: yup.string().required("Education is required"),
//   carOwnership: yup.string().required("Car ownership is required"),
//   numberOfChildren: yup.number().required("Number of children is required").min(0, "Cannot be less than 0"),
//   totalIncome2: yup.number().required("Total income is required").positive("Must be a positive number"),
//   gender: yup.string().required("Gender is required"),
//   familyMembers: yup.number().required("Number of family members is required").positive().integer(),
//   familyStatus: yup.string().required("Family status is required"),
//   housingType: yup.string().required("Housing type is required"),
//   daysEmployed: yup.number().required("Days employed is required"),
//   occupationType: yup.string().required("Occupation type is required")
// });

// const FarmerDetailsModal: React.FC<FarmerDetailsModalProps> = ({ isOpen, onClose, farmerData }) => {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [apiError, setApiError] = useState('');

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<FarmerFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: farmerData,
//   });

//   const onSubmit = async (data: FarmerFormData) => {
//     setIsSubmitting(true);
//     setApiError('');

//     try {
//       const response = await fetch('/api/check-eligibility', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }

//       const result: EligibilityResponse = await response.json();

//       if (result.userId) {
//         // Store credit score data in localStorage
//         localStorage.setItem('initialCreditScore', JSON.stringify({
//           score: result.creditScore.score,
//           creditWorthiness: result.creditScore.creditWorthiness,
//           loanRange: result.creditScore.loanRange,
//           lastCheckedDate: result.creditScore.lastCheckedDate,
//           isEligible: result.isEligible
//         }));

//         // Show success message before redirecting
//         const eligibilityStatus = result.isEligible ? 'Eligible' : 'Not Eligible';
//         const creditScore = result.creditScore.score;

//         alert(`Eligibility Check Complete!\nStatus: ${eligibilityStatus}\nCredit Score: ${creditScore}`);

//         // Close the modal
//         onClose();

//         // Navigate to the member page
//         router.push(`/member/${result.userId}`);
//       } else {
//         setApiError('Failed to process eligibility check');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setApiError('An error occurred while checking eligibility. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
//       <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto m-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Farmer Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ×
//           </button>
//         </div>

//         {apiError && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {apiError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             {/* Form fields */}
//             {[
//               { label: "Total income", name: "totalIncome", type: "number" },
//               { label: "Age", name: "age", type: "number" },
//               { label: "Education Level", name: "education", type: "select", options: ["Primary", "Secondary", "Tertiary"] },
//               { label: "Car Ownership", name: "carOwnership", type: "select", options: ["Yes", "No"] },
//               { label: "Number of children", name: "numberOfChildren", type: "number" },
//               { label: "Total income (secondary)", name: "totalIncome2", type: "number" },
//               { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
//               { label: "Number of family members", name: "familyMembers", type: "number" },
//               { label: "Family status", name: "familyStatus", type: "select", options: ["Single", "Married", "Divorced"] },
//               { label: "Days employed", name: "daysEmployed", type: "number" },
//               { label: "Housing type", name: "housingType", type: "select", options: ["Rented", "Owned"] },
//               { label: "Occupation type", name: "occupationType", type: "select", options: ["Farmer", "Farm Worker"] },
//             ].map(({ label, name, type, options }) => (
//               <div key={name}>
//                 <label className="block text-sm font-medium text-gray-700">{label}</label>
//                 {type === "select" ? (
//                   <select
//                     {...register(name as keyof FarmerFormData)}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                   >
//                     <option value="">Select</option>
//                     {options?.map(option => (
//                       <option key={option} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     {...register(name as keyof FarmerFormData)}
//                     type={type}
//                     className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                   />
//                 )}
//                 {errors[name as keyof FarmerFormData] && (
//                   <p className="text-red-500 text-sm">{errors[name as keyof FarmerFormData]?.message}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-end space-x-4 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.421 3.579 8 8 8v-2.709z"></path>
//                   </svg>
//                   Processing...
//                 </span>
//               ) : (
//                 "Submit"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FarmerDetailsModal;


// #ORIGINAL


// "use client";
// import React from 'react';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useRouter } from 'next/navigation';

// interface FarmerFormData {
//   owns_car: string,
//   owns_property: string,
//   num_children: number,
//   total_income: number,
//   education_type: string,
//   family_status: string,
//   housing_type: string,
//   age: number,
//   employment_duration: number,
//   number_of_family_members: number,
//   total_dependents: number,
//   is_long_employment: string
// }

// interface FarmerDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   farmerData?: Partial<FarmerFormData>;
// }

// interface EligibilityResponse {
//   prediction: boolean;
//   probability: number;
// }

// const schema = yup.object().shape({
//   total_income: yup.number().required("Total income is required").positive("Must be a positive number"),
//   age: yup.number().required("Age is required").positive().integer(),
//   education_type: yup.string().required("Education is required"),
//   owns_car: yup.string().required("Car ownership is required"),
//   num_children: yup.number().required("Number of children is required").min(0, "Cannot be less than 0"),
//   number_of_family_members: yup.number().required("Number of family members is required").positive().integer(),
//   family_status: yup.string().required("Family status is required"),
//   housing_type: yup.string().required("Housing type is required"),
//   employment_duration: yup.number().required("Employment duration is required").min(0, "Cannot be less than 0").max(100, "Must be less than 100 years"),
//   is_long_employment: yup.string().required("Employment type is required"),
// });

// const FarmerDetailsModal: React.FC<FarmerDetailsModalProps> = ({ isOpen, onClose, farmerData }) => {
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<FarmerFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: farmerData,
//   });

//   const transformFormData = (data: FarmerFormData) => {
//     return {
//       ...data,
//       owns_car: data.owns_car === 'Yes' ? 1 : 0,
//       owns_property: data.owns_property === 'Yes' ? 1 : 0,
//       education_type: data.education_type === 'Primary' ? 0 : data.education_type === 'Secondary' ? 1 : 2,
//       family_status: data.family_status === 'Single' ? 0 : data.family_status === 'Married' ? 1 : 2,
//       housing_type: data.housing_type === 'Owned' ? 1 : 0,
//       is_long_employment: data.is_long_employment === 'Yes' ? 1 : 0,
//     };
//   };

//   const onSubmit = async (data: FarmerFormData) => {
//     try {
//       const transformedData = transformFormData(data);

//       const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/predict/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(transformedData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`API error: ${errorText}`);
//       }

//       const result: EligibilityResponse = await response.json();

//       const eligibilityData = {
//         isEligible: result.prediction,
//         probability: result.probability,
//         lastCheckedDate: new Date().toISOString()
//       };

//       localStorage.setItem('eligibilityResult', JSON.stringify(eligibilityData));

//       onClose();
//       await new Promise(resolve => setTimeout(resolve, 100));
//       router.push(`/eligibility-result?status=${result.prediction}&probability=${result.probability}`);

//     } catch (error) {
//       console.error('Error in form submission:', error);
//       setError('root', {
//         type: 'manual',
//         message: 'An error occurred while checking eligibility'
//       });
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-y-auto">
//       <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-90vh overflow-y-auto m-4">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Farmer Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             {/* Input Fields with error handling */}
//             {[
//               { name: 'total_income', label: 'Total income', type: 'number' },
//               { name: 'age', label: 'Age', type: 'number' },
//               { name: 'num_children', label: 'Number of children', type: 'number' },
//               { name: 'number_of_family_members', label: 'Number of family members', type: 'number' },
//               { name: 'employment_duration', label: 'Employment duration', type: 'number', step: '0.1', placeholder: 'Enter years of employment' }
//             ].map(field => (
//               <div key={field.name}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                 </label>
//                 <input
//                   {...register(field.name as keyof FarmerFormData)}
//                   type={field.type}
//                   step={field.step}
//                   placeholder={field.placeholder}
//                   className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//                 />
//                 {errors[field.name as keyof FarmerFormData] && (
//                   <p className="text-red-500 text-sm">
//                     {errors[field.name as keyof FarmerFormData]?.message}
//                   </p>
//                 )}
//               </div>
//             ))}

//             {/* Select Fields with options */}
//             {[
//               {
//                 name: 'education_type',
//                 label: 'Education Level',
//                 options: ['', 'Primary', 'Secondary', 'Tertiary']
//               },
//               {
//                 name: 'owns_car',
//                 label: 'Car Ownership',
//                 options: ['', 'Yes', 'No']
//               },
//               {
//                 name: 'owns_property',
//                 label: 'Property Ownership',
//                 options: ['', 'Yes', 'No']
//               },
//               {
//                 name: 'family_status',
//                 label: 'Family status',
//                 options: ['', 'Single', 'Married', 'Divorced']
//               },
//               {
//                 name: 'housing_type',
//                 label: 'Housing type',
//                 options: ['', 'Rented', 'Owned']
//               },
//               {
//                 name: 'is_long_employment',
//                 label: 'Long-term Employment',
//                 options: ['', 'Yes', 'No']
//               }
//             ].map(selectField => (
//               <div key={selectField.name}>
//                 <label className="block text-sm font-medium text-gray-700">
//                   {selectField.label}
//                 </label>
//                 <select
//                   {...register(selectField.name as keyof FarmerFormData)}
//                   className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                 >
//                   {selectField.options.map(option => (
//                     <option key={option} value={option}>
//                       {option || 'Select'}
//                     </option>
//                   ))}
//                 </select>
//                 {errors[selectField.name as keyof FarmerFormData] && (
//                   <p className="text-red-500 text-sm">
//                     {errors[selectField.name as keyof FarmerFormData]?.message}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-end space-x-4 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             >
//               Check Eligibility
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FarmerDetailsModal;










// "use client";

// import React from 'react';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useRouter } from 'next/navigation';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Define form schema using Yup
// const farmerSchema = yup.object().shape({
//   firstName: yup.string().required("First name is required"),
//   lastName: yup.string().required("Last name is required"),
//   age: yup.number().required("Age is required").positive().integer(),
//   // Add other fields as necessary
// });

// interface FarmerFormData {
//   firstName: string;
//   lastName: string;
//   age: number;
//   // Add other fields as necessary
// }

// const FarmerDetailsModal: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FarmerFormData>({
//     resolver: yupResolver(farmerSchema)
//   });

//   const router = useRouter();

//   const onSubmit = async (data: FarmerFormData) => {
//     try {
//       // Simulated API request - replace with actual API logic
//       const response = {
//         prediction: true, // Simulate a prediction result
//         probability: 0.85 // Simulate a probability result
//       };

//       if (response.prediction) {
//         toast.success(`Farmer qualifies for a loan with ${Math.round(response.probability * 100)}% confidence.`);
//       } else {
//         toast.error(`Farmer does not qualify for a loan. Probability: ${Math.round(response.probability * 100)}%.`);
//       }

//       // Add any additional navigation or logic if needed
//       // router.push('/some-page'); // Example navigation
//     } catch (error) {
//       console.error('Error in form submission:', error);
//       toast.error('An error occurred while checking eligibility.');
//     }
//   };

//   return (
//     <div className="modal-container">
//       <form onSubmit={handleSubmit(onSubmit)} className="form">
//         <div className="form-group">
//           <label>First Name</label>
//           <input type="text" {...register("firstName")} />
//           {errors.firstName && <p className="error">{errors.firstName.message}</p>}
//         </div>

//         <div className="form-group">
//           <label>Last Name</label>
//           <input type="text" {...register("lastName")} />
//           {errors.lastName && <p className="error">{errors.lastName.message}</p>}
//         </div>

//         <div className="form-group">
//           <label>Age</label>
//           <input type="number" {...register("age")} />
//           {errors.age && <p className="error">{errors.age.message}</p>}
//         </div>

//         {/* Add more fields as necessary */}

//         <button type="submit" className="submit-button">Check Eligibility</button>
//       </form>

//       {/* ToastContainer is necessary for displaying toast notifications */}
//       <ToastContainer position="top-right" autoClose={5000} />
//     </div>
//   );
// };

// export default FarmerDetailsModal;






// "use client";

// import React, { useState } from 'react';
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// interface FarmerFormData {
//   owns_car: string;
//   owns_property: string;
//   num_children: number;
//   total_income: number;
//   education_type: string;
//   family_status: string;
//   housing_type: string;
//   age: number;
//   employment_duration: number;
//   number_of_family_members: number;
//   total_dependents: number;
//   is_long_employment: string;
// }

// interface EligibilityResponse {
//   prediction: boolean;
//   qualifyingPoints: string; // Points by which the farmer qualifies
// }

// const schema = yup.object().shape({
//   total_income: yup.number().required("Total income is required").positive("Must be a positive number"),
//   age: yup.number().required("Age is required").positive().integer(),
//   education_type: yup.string().required("Education is required"),
//   owns_car: yup.string().required("Car ownership is required"),
//   num_children: yup.number().required("Number of children is required").min(0, "Cannot be less than 0"),
//   number_of_family_members: yup.number().required("Number of family members is required").positive().integer(),
//   family_status: yup.string().required("Family status is required"),
//   housing_type: yup.string().required("Housing type is required"),
//   employment_duration: yup.number().required("Employment duration is required").min(0, "Cannot be less than 0").max(100, "Must be less than 100 years"),
//   is_long_employment: yup.string().required("Employment type is required"),
// });

// const FarmerDetailsModal: React.FC<{ isOpen: boolean; onClose: () => void; farmerData?: Partial<FarmerFormData>; }> = ({ isOpen, onClose, farmerData }) => {
//   const [eligibilityResult, setEligibilityResult] = useState<{ isEligible: boolean; qualifyingPoints: string; } | null>(null);
//   const [showResultModal, setShowResultModal] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<FarmerFormData>({
//     resolver: yupResolver(schema),
//     defaultValues: farmerData,
//   });

//   const transformFormData = (data: FarmerFormData) => {
//     return {
//       ...data,
//       owns_car: data.owns_car === 'Yes' ? 1 : 0,
//       owns_property: data.owns_property === 'Yes' ? 1 : 0,
//       education_type: data.education_type === 'Primary' ? 0 : data.education_type === 'Secondary' ? 1 : 2,
//       family_status: data.family_status === 'Single' ? 0 : data.family_status === 'Married' ? 1 : 2,
//       housing_type: data.housing_type === 'Owned' ? 1 : 0,
//       is_long_employment: data.is_long_employment === 'Yes' ? 1 : 0,
//     };
//   };

//   const onSubmit = async (data: FarmerFormData) => {
//     try {
//       const transformedData = transformFormData(data);

//       const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/predict/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(transformedData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`API error: ${errorText}`);
//       }

//       const result: EligibilityResponse = await response.json();
//       const qualifyingPoints = result.qualifyingPoints;

//       // Show eligibility result modal
//       setEligibilityResult({ isEligible: result.prediction, qualifyingPoints });
//       setShowResultModal(true);

//     } catch (error) {
//       console.error('Error in form submission:', error);
//       setError('root', {
//         type: 'manual',
//         message: 'An error occurred while checking eligibility'
//       });
//     }
//   };

//   const closeResultModal = () => {
//     setShowResultModal(false);
//     setEligibilityResult(null);
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center overflow-y-auto">
//         <div className="bg-white rounded-lg p-6 md:p-8 max-w-lg w-full shadow-lg">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Farmer Details</h2>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
//           </div>

//           {showResultModal && eligibilityResult && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
//               <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
//                 <h3 className="text-lg font-semibold">Eligibility Result</h3>
//                 <p className="mt-2 text-md">{eligibilityResult.isEligible ? "The farmer is eligible!" : "The farmer is not eligible."}</p>
//                 <p className="mt-2 text-md">Qualifying Points: <strong>{eligibilityResult.qualifyingPoints}</strong></p>
//                 <div className="mt-4 flex justify-end">
//                   <button onClick={closeResultModal} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Close</button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               {[
//                 { name: 'total_income', label: 'Total income', type: 'number' },
//                 { name: 'age', label: 'Age', type: 'number' },
//                 { name: 'num_children', label: 'Number of children', type: 'number' },
//                 { name: 'number_of_family_members', label: 'Number of family members', type: 'number' },
//                 { name: 'employment_duration', label: 'Employment duration', type: 'number', step: '0.1', placeholder: 'Enter years of employment' }
//               ].map(field => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-medium text-gray-700">{field.label}</label>
//                   <input
//                     {...register(field.name as keyof FarmerFormData)}
//                     type={field.type}
//                     step={field.step}
//                     placeholder={field.placeholder}
//                     className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   {errors[field.name as keyof FarmerFormData] && (
//                     <p className="text-red-500 text-sm">{errors[field.name as keyof FarmerFormData]?.message}</p>
//                   )}
//                 </div>
//               ))}

//               {[
//                 { name: 'education_type', label: 'Education Level', options: ['', 'Primary', 'Secondary', 'Tertiary'] },
//                 { name: 'owns_car', label: 'Car Ownership', options: ['', 'Yes', 'No'] },
//                 { name: 'owns_property', label: 'Property Ownership', options: ['', 'Yes', 'No'] },
//                 { name: 'family_status', label: 'Family status', options: ['', 'Single', 'Married', 'Divorced'] },
//                 { name: 'housing_type', label: 'Housing type', options: ['', 'Rented', 'Owned'] },
//                 { name: 'is_long_employment', label: 'Long-term Employment', options: ['', 'Yes', 'No'] }
//               ].map(selectField => (
//                 <div key={selectField.name}>
//                   <label className="block text-sm font-medium text-gray-700">{selectField.label}</label>
//                   <select
//                     {...register(selectField.name as keyof FarmerFormData)}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     {selectField.options.map(option => (
//                       <option key={option} value={option}>{option || 'Select'}</option>
//                     ))}
//                   </select>
//                   {errors[selectField.name as keyof FarmerFormData] && (
//                     <p className="text-red-500 text-sm">{errors[selectField.name as keyof FarmerFormData]?.message}</p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-end space-x-4 mt-6">
//               <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
//               <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Check Eligibility</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FarmerDetailsModal;




"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FarmerFormData {
  owns_car: string;
  owns_property: string;
  num_children: number;
  total_income: number;
  education_type: string;
  family_status: string;
  housing_type: string;
  age: number;
  employment_duration: number;
  number_of_family_members: number;
  total_dependents: number;
  is_long_employment: string;
}

interface EligibilityResponse {
  qualifyingPoints: number | null; // The points are returned by the backend
}

const schema = yup.object().shape({
  total_income: yup.number().required("Total income is required").positive("Must be a positive number"),
  age: yup.number().required("Age is required").positive().integer(),
  education_type: yup.string().required("Education is required"),
  owns_car: yup.string().required("Car ownership is required"),
  num_children: yup.number().required("Number of children is required").min(0, "Cannot be less than 0"),
  number_of_family_members: yup.number().required("Number of family members is required").positive().integer(),
  family_status: yup.string().required("Family status is required"),
  housing_type: yup.string().required("Housing type is required"),
  employment_duration: yup.number().required("Employment duration is required").min(0, "Cannot be less than 0").max(100, "Must be less than 100 years"),
  is_long_employment: yup.string().required("Employment type is required"),
});

const FarmerDetailsModal: React.FC<{ isOpen: boolean; onClose: () => void; farmerData?: Partial<FarmerFormData>; }> = ({ isOpen, onClose, farmerData }) => {
  const [eligibilityResult, setEligibilityResult] = useState<{ isEligible: boolean; qualifyingPoints: number | string; } | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FarmerFormData>({
    resolver: yupResolver(schema),
    defaultValues: farmerData,
  });

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

  const onSubmit = async (data: FarmerFormData) => {
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
      console.log(result); // Log the entire response to check the structure

      // Determine eligibility dynamically based on the points
      const qualifyingPoints = result.qualifyingPoints;
      const isEligible = qualifyingPoints !== null && qualifyingPoints >= 50; // Assuming 50 is the eligibility threshold

      setEligibilityResult({
        isEligible: isEligible,
        qualifyingPoints: qualifyingPoints !== null ? qualifyingPoints : "No points returned",
      });
      setShowResultModal(true);

    } catch (error) {
      console.error('Error in form submission:', error);
      setError('root', {
        type: 'manual',
        message: 'An error occurred while checking eligibility',
      });
    }
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setEligibilityResult(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center overflow-y-auto">
        <div className="bg-white rounded-lg p-6 md:p-8 max-w-lg w-full shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Farmer Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
          </div>

          {showResultModal && eligibilityResult && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                <h3 className="text-lg font-semibold">Eligibility Result</h3>
                <p className="mt-2 text-md">
                  {eligibilityResult.isEligible
                    ? "The farmer is eligible!"
                    : "The farmer is not eligible."}
                </p>
                <p className="mt-2 text-md">
                  Qualifying Points: <strong>{eligibilityResult.qualifyingPoints}</strong>
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={closeResultModal}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { name: 'total_income', label: 'Total income', type: 'number' },
                { name: 'age', label: 'Age', type: 'number' },
                { name: 'num_children', label: 'Number of children', type: 'number' },
                { name: 'number_of_family_members', label: 'Number of family members', type: 'number' },
                { name: 'employment_duration', label: 'Employment duration', type: 'number', step: '0.1', placeholder: 'Enter years of employment' }
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  <input
                    {...register(field.name as keyof FarmerFormData)}
                    type={field.type}
                    step={field.step}
                    placeholder={field.placeholder}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors[field.name as keyof FarmerFormData] && (
                    <p className="text-red-500 text-sm">{errors[field.name as keyof FarmerFormData]?.message}</p>
                  )}
                </div>
              ))}

              {[
                { name: 'education_type', label: 'Education Level', options: ['', 'Primary', 'Secondary', 'Tertiary'] },
                { name: 'owns_car', label: 'Car Ownership', options: ['', 'Yes', 'No'] },
                { name: 'owns_property', label: 'Property Ownership', options: ['', 'Yes', 'No'] },
                { name: 'family_status', label: 'Family status', options: ['', 'Single', 'Married', 'Divorced'] },
                { name: 'housing_type', label: 'Housing type', options: ['', 'Rented', 'Owned'] },
                { name: 'is_long_employment', label: 'Long-term Employment', options: ['', 'Yes', 'No'] }
              ].map(selectField => (
                <div key={selectField.name}>
                  <label className="block text-sm font-medium text-gray-700">{selectField.label}</label>
                  <select
                    {...register(selectField.name as keyof FarmerFormData)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {selectField.options.map(option => (
                      <option key={option} value={option}>{option || 'Select'}</option>
                    ))}
                  </select>
                  {errors[selectField.name as keyof FarmerFormData] && (
                    <p className="text-red-500 text-sm">{errors[selectField.name as keyof FarmerFormData]?.message}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Check Eligibility</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FarmerDetailsModal;
