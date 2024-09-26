
// 'use client';
// import React, { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';

// const Otp = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '']);
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     inputRefs.current = inputRefs.current.slice(0, otp.length);
//   }, [otp]);

//   const handleChange = (e, index) => {
//     const value = e.target.value.replace(/[^0-9]/, ''); 
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < otp.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = () => {
//     const fullOtp = otp.join('');
//     if (fullOtp.length === 5) {
//       console.log('OTP submitted:', fullOtp);
//     } else {
//       alert('Please enter a valid 5-digit OTP.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 border-2 border-blue-400 shadow-md w-[700px] h-[900px] ml-64">
//         <h1 className="text-2xl font-bold mb-6 mt-40 ml-8">Check your email</h1>
//         <p className="ml-8 mb-6 text-gray-500 text-2xl">
//           We sent a reset link to inganji@...com <span></span>
//           Enter a 5-digit code that is in the email
//         </p>

//         <div className="flex  mb-4  border-blue-400 gap-3">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(ref) => (inputRefs.current[index] = ref)}
//               className="w-16 h-16 mx-1 border border-blue-400 rounded-lg mt-12 ml-10"
//               maxLength="1"
//               aria-label={`OTP digit ${index + 1}`}
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="w-56 bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-800 ml-52 mt-20 text-2xl border-4"
//         >
//           Reset Password
//         </button>

//         <h3 className="text-gray-500 text-2xl ml-20 mt-10 font-bold">Haven't got the email yet? Resend email</h3>
//       </div>

//       <div className="hidden lg:block -ml-2">
//         <Image src="/media/email_vector.png" alt="email" width={750} height={400} />
//       </div>
//     </div>
//   );
// };

// export default Otp;
