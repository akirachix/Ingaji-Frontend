"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
import { useRouter } from "next/navigation";
import { userLogin } from "../utils/fetchlogin";
import { getCookie} from "cookies-next";
import Link from "next/link";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});



export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { username, password } = values;

      try {
        const data = await userLogin({ username, password });
        console.log("Login successful:", data);

      
           const role =getCookie('role')
           if (role==='sacco'){
            router.push('/sacco/sacco-overview');
          }
          else{
            router.push('/cooperative/Overview');
           }

       
      } catch (err) {
        console.error("Login error:", err);
        setLoginError("Login failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://fanikisha-3beb7fcefffe.herokuapp.com/auth/login";
  };

return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-8  w-full sm:w-[1040px] h-auto">
      <h1 className="text-5xl work-sans font-bold mb-6 mt-20 text-center">
        Welcome Back To <b className="text-blue-600">Fanikisha!</b>
      </h1>
      <p className="text-center mb-6 text-2xl">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-Up"
          className="2xl:font-medium text-blue-600 hover:text-blue-500"
        >
          Sign Up
        </Link>
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div
          aria-live="assertive"
          className="text-red-500 text-sm mt-1 text-center"
        >
          {loginError && <span>{loginError}</span>}
        </div>


        <div className="mb-12 mt-24">
          <label
            htmlFor="username"
            className="block mb-2 text-2xl font-medium ml-32"
          >
            Username:
          </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="w-full sm:w-[690px] px-3 py-4 border border-blue-400 rounded-lg ml-32"
            aria-invalid={
              formik.touched.username && Boolean(formik.errors.username)
            }
            aria-describedby="username-error"
          />
          {formik.touched.username && formik.errors.username && (
            <div id="username-error" className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-2xl font-medium ml-32"
          >
            Password:
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full sm:w-[690px] px-3 py-4 border border-blue-400 rounded-lg ml-32"
              aria-invalid={
                formik.touched.password && Boolean(formik.errors.password)
              }
              aria-describedby="password-error"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-40 items-center pr-3 flex text-3xl text-blue-500"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <MdVisibility /> : <MdOutlineVisibilityOff />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div id="password-error" className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-40 ${loading ? "bg-gray-500" : "bg-blue-500"} text-white font-bold py-2 rounded-md hover:bg-blue-600 ml-96 mt-16 text-2xl`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 -ml-10 text-center">
        <span className="text-gray-500 text-2xl">or</span>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`flex items-center justify-center ml-80 px-4 py-2 border mt-6 rounded-full border-blue-400 border-b-2`}
      >
        <Image
          src="/images/google-icon.png"
          alt="Google Icon"
          width={30}
          height={30}
        />
        <span
          className={`ml-2 text-2xl font-work-sans ${loading ? "text-gray-400" : "text-gray-800"}`}
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </span>
      </button>
    </div>

    <div className="hidden lg:block ml-8 mb-20">
      <Image
        src="/images/login_vector.png"
        alt="Login Illustration"
        width={890}
        height={820}
      />
    </div>
  </div>
);
}

