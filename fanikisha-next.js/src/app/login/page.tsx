
// 'use client';
// import Image from 'next/image';
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
// import { useRouter } from 'next/navigation';
// import { userLogin } from '../(sacco)/sacco/utils/fetchlogin';
// import { setCookie } from 'cookies-next';

// const loginSchema = Yup.object().shape({
//   username: Yup.string().required('Required'),
//   password: Yup.string().required('Required'),
// });

// export default function LoginForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loginError, setLoginError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter(); 

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//     },
//     validationSchema: loginSchema,
//     onSubmit: async (values) => {
//       setLoading(true);
//       const { username, password } = values;
//       try {
//         const data = await userLogin({ username, password });
//         console.log('login successful:', data);

//         setCookie('username', username, { maxAge: 30 * 24 * 60 * 60, path: '/' });
//         setCookie('token', data.token, { maxAge: 30 * 24 * 60 * 60, path: '/' });

//         router.push('/dashboard');
//       } catch (err) {
//         console.error('login error:', err);
//         setLoginError('login failed. Please check your credentials.');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const togglePasswordVisibility = () => {
//     setShowPassword(prevState => !prevState);
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = 'https://fanikisha-3beb7fcefffe.herokuapp.com/auth/login';
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white 2xl:p-8 xl:p-12 lg:p-12 xl:py-2 xl:mb-2 xl:mt-2 lg:py-0 2xl:w-[820px] 2xl:h-[890px] lg:w-[700px] lg:ml-12 lg:h-screen xl:h-screen 2xl:ml-2">
//         <h1 className="2xl:text-5xl lg:text-xl xl:text-xl work-sans font-bold mb-6 mt-20 text-center">Welcome Back!</h1>
//         <p className="text-center mb-6 2xl:text-2xl xl:text-xl lg:text-sm ">
//           Don&apos;t have an account?{' '}
//           <a href="#" className="text-blue-500 font-bold hover:underline">
//             SignUp
//           </a>
//         </p>

//         <form onSubmit={formik.handleSubmit}>
//           {loginError && (
//             <div className="text-red-500 text-sm mt-1 text-center">{loginError}</div>
//           )}

//           <div className="2xl:mb-12 2xl:mt-24 lg:mt-10 xl:mt-10 lg:mb-10 xl:mb-10">
//             <label htmlFor="username" className="block mb-2 2xl:text-2xl xl:text-xl lg:text-sm font-medium ml-8 ">
//               Username:
//             </label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.username}
//               className="w-[690px] px-3 2xl:py-4 lg:py-2 border border-blue-400 rounded-lg ml-8 lg:w-[350px] 2xl:w-[700px] xl:w-[450px]"
//             />
//             {formik.touched.username && formik.errors.username && (
//               <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
//             )}
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block mb-2 2xl:text-2xl xl:text-xl lg:text-sm font-medium ml-8 ">
//               Password:
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//                 className="w-[690px] px-3 2xl:py-4 lg:py-2 border border-blue-400 rounded-lg ml-8 lg:w-[350px] 2xl:w-[700px] xl:w-[450px]"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 2xl:right-12 xl:right-2 lg:right-2 items-center pr-3 flex text-3xl text-blue-500"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />} 
//               </button>
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className={`w-40 ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white font-bold py-2 rounded-md hover:bg-blue-600 2xl:ml-72 xl:ml-40 lg:ml-28 mt-16 2xl:text-2xl xl:text-xl lg:text-sm `}
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         <div className="mt-4 -ml-10 lg:-ml-3 xl:-ml-3 text-center">
//           <span className="text-gray-500 2xl:text-2xl lg:text-sm xl:text-xl">or</span>
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className={`flex items-center justify-center 2xl:ml-56 lg:ml-24 xl:ml-28 px-4 py-2 border mt-6 rounded-full border-blue-400 border-b-2`}
//         >
//           <Image src="/images/google-icon.png" alt="Google Icon" width={30} height={30} />
//           <span className={`ml-2 2xl:text-2xl xl:text-xl lg:text-sm font-work-sans ${loading ? "text-gray-400" : "text-gray-800"}`}>
//             {loading ? "Signing in..." : "Sign in with Google"}
//           </span>
//         </button>

//       </div>

//       <div className="hidden lg:block ml-8 mb-20">
//         <Image src="/images/login_vector.png" alt="login" width={890} height={890} />
//       </div>
//     </div>
//   );
// }



'use client';
import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import Layout from '../(sacco)/sacco/components/Layout';
import { useMilkRecord } from '../(sacco)/sacco/hooks/useMilkRecord';
import { Link } from 'react-router-dom';

interface MilkRecord {
  record_id: number;
  first_name: string;
  last_name: string;
  milk_quantity: number;
  price: number;
  date: string;
}

const MilkRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: milkRecords, loading, error } = useMilkRecord();

  if (loading) return <Layout><div className="container mx-auto p-4">Loading...</div></Layout>;
  if (error) return <Layout><div className="container mx-auto p-4">Error: {error}</div></Layout>;

  const filteredRecords = milkRecords ? milkRecords.filter((record: MilkRecord) => {
    const total = (record.milk_quantity * record.price).toFixed(2);
    const recordDate = new Date(record.date).toLocaleDateString();
    return (
      record.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.milk_quantity.toString().includes(searchTerm) ||
      record.price.toString().includes(searchTerm) ||
      recordDate.includes(searchTerm) ||
      total.includes(searchTerm)
    );
  }) : [];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-5xl font-bold text-blue-500 mb-4">Milk Records</h1>
        <div className="relative mb-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[54px] p-2 pr-10 text-lg border border-gray-300 rounded-[10px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <MdSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        {filteredRecords.length > 0 ? (
          <table className="w-full border-collapse text-lg">
            <thead>
              <tr className="bg-white text-left text-blue-500 border-b-8 border-blue-400 text-2xl">
                <th className="p-2 text-left">First Name</th>
                <th className="p-2 text-left">Last Name</th>
                <th className="p-2 text-left">Quantity (L)</th>
                <th className="p-2 text-left">Price per Litre</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Total (Ksh)</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record: MilkRecord) => (
                <tr key={record.record_id} className={record.record_id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="p-2 border-t">
                    <Link to={`/collection/${record.record_id}`} className="text-blue-500">
                      {record.first_name}
                    </Link>
                  </td>
                  <td className="p-2 border-t">{record.last_name}</td>
                  <td className="p-2 border-t">{record.milk_quantity}</td>
                  <td className="p-2 border-t">{record.price}</td>
                  <td className="p-2 border-t">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="p-2 border-t">{(record.milk_quantity * record.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No milk records found.</p>
        )}
      </div>
    </Layout>
  );
};

export default MilkRecords;


