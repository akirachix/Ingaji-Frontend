
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md"; 

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 border border-blue-400 shadow-md w-[700px] h-[900px]">
        <h1 className="text-5xl work-sans font-bold mb-6 mt-44 text-center">Set a new password</h1>
        <p className="text-center mb-6 text-xl">
          Create a new password.Ensure it differs from <br></br>prevoius ones for security
        </p>

        <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-2xl font-medium ml-12">
            Your Password:
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-[550px] px-3 py-4 border border-blue-400 rounded-lg ml-12"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-12 pr-3 flex items-center stroke-blue-400"
                onClick={togglePasswordVisibility} 
              >
                {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />} 
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-2xl font-medium ml-12">
            Confirm Password:
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-[550px] px-3 py-4 border border-blue-400 rounded-lg ml-12"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-12 pr-3 flex items-center"
                onClick={togglePasswordVisibility} 
              >
                {showPassword ? <MdVisibility  className='stroke-blue-400'/> : <MdOutlineVisibilityOff className='stroke-blue-400'/>} 
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-64 bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 ml-48 mt-16 text-2xl"
          >
          update password
          </button>
        </form>

        
       
      </div>

      <div className="hidden lg:block ml-8">
        <Image src="/media/password reset vector.png" alt="login" width={600} height={400} />
      </div>
    </div>
  );
}
