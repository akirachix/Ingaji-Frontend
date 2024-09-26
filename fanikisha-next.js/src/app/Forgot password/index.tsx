'use client';

import React,{useState} from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdOutlineVisibilityOff } from "react-icons/md";


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 border border-blue-400 shadow-md w-[700px] h-[1000px]">
        <h1 className="text-2xl work-sans font-bold mb-6 mt-44 ml-5">Forgot password?</h1>
        <p className="ml-5 mb-6 text-2xl font-bold">
          please enter your email to reset the password
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-12 mt-24">
            <label htmlFor="email" className="block mb-2 text-2xl font-bold ml-5">
            Your Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-[550px] px-3 py-4 border border-blue-400 rounded-lg ml-5"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>  

          <button
            type="submit"
            className="w-52 bg-blue-500 text-white  font-bold py-2 rounded-md hover:bg-blue-600 ml-52 mt-16 text-2xl"
          >
            Reset password
          </button>
        </form>

      </div>

      <div className="hidden lg:block ml-8">
        <Image src="/media/forgot password vector.png" alt="login" width={600} height={400} />
      </div>
    </div>
  );
}


