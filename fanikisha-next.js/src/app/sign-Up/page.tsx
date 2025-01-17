"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userSignup } from "../utils/postUserCredentials";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  role: yup.string().required("Role is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

type FormData = yup.InferType<typeof schema>;

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [apiError, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        role: data.role,
        password: data.password,
      };
      const response = await userSignup(formData);

      if (response.error) {
        setErrorMessage(response.error);
      } else {
      setCookie('role', data.role, { maxAge: 60 * 60 * 24 * 7, path:'/' }); 

      setSuccessMessage("Account created successfully!");
      setTimeout(() => router.push("/login"), 2000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  };
 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="flex items-center lg:px-2   xl:px-4 lg:flex justify-center items-centre 2xl:px-6 2xl:min-h-screen lg:min-h-3.5 bg-white-100 font-work sans">
      <div className="2xl:w-[1250px] lg:w-[700px] flex justify-between items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="2xl:w-[2780px] lg:w-[1000px] xl:w-[1900px] 2xl:container 2xl:mx-auto 2xl:py-[30px] lg:py-[26px] xl:py-[44px] lg:px-1 xl:px-1 2xl:px-18 bg-white  shadow-md 2xl:mt-1 2xl:ml-[-220px] lg:ml-[-100px] xl:ml-[-190px] "
        >
          <h1 className="2xl:text-[50px]  2xl:mb-3 lg:mb-[-5px] xl:mb-[2px] text-blue-500 font-bold text-center lg:text-[40px] xl:text-[48px] 2xl:mt-[-30px] xl:mt-[-14px]">
            Sign Up
          </h1>

          <div className="mb-1 flex flex-col items-center">
            <label
              htmlFor="First_name"
              className="2xl:text-[22px]  lg:text-[14px]  xl:text-[20px] text-black-700 2xl:ml-[-690px] lg:ml-[-290px] xl:ml-[-380px]"
            >
              First Name:
            </label>
            <input
              id="first_name"
              {...register("first_name")}
              className="2xl:mt-1 block 2xl:w-full lg:w-3/4  xl:w-full border border-blue-500 rounded-md shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            />
            {errors.first_name && (
              <span className="2xl:text-red-500 2xl:text-sm">
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div className="2xl:mb-1 flex flex-col items-center">
            <label
              htmlFor="Last_name"
              className="2xl:text-[22px] xl:text-[20px] text-black-700 2xl:ml-[-690px] lg:ml-[-290px] lg:text-[14px] xl:ml-[-380px]"
            >
              Last Name:
            </label>
            <input
              id="last_name"
              {...register("last_name")}
              className="2xl:mt-1 block 2xl:w-full lg:w-3/4 xl:w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            />
            {errors.last_name && (
              <span className="text-red-500 2xl:text-sm">
                {errors.last_name.message}
              </span>
            )}
          </div>

          <div className="2xl:mb-1 flex flex-col items-center">
            <label
              htmlFor="username"
              className="2xl:text-[22px] xl:text-[20px] text-black-700 2xl:ml-[-700px] lg:ml-[-290px] lg:text-[14px] xl:ml-[-390px]"
            >
              Username:
            </label>
            <input
              id="username"
              {...register("username")}
              className="2xl:mt-1 block 2xl:w-full lg:w-3/4 border xl:w-full border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            />
            {errors.username && (
              <span className="text-red-500 2xl:text-sm">
                {errors.username.message}
              </span>
            )}
          </div>

         
  <div className="mb-1 flex flex-col items-center ">
  <label
    htmlFor="Role"
    className="2xl:text-[22px] text-black-700 lg:ml-[-330px] lg:text-[14px] xl:text-[20px] xl:ml-[-450px] 2xl:ml-[-780px] "
  >
    Role:
  </label>
  <div className="relative w-full lg:w-3/4 xl:w-full">
    <select
      id="role"
      {...register("role")}
      className="appearance-none 2xl:mt-1 block 2xl:w-full border xl:text-[20px] border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2 lg:w-[365px] xl:w-[520px]"
      style={{ paddingRight: "2.5rem" }}  
    >
      <option value="">Select Role</option>
      <option value="cooperative">cooperative</option>
      <option value="sacco">sacco</option>
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <svg
        className="w-5 h-5 text-black-500 2xl:mr-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 12a1 1 0 01-.707-.293l-5-5A1 1 0 015.707 5.293L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
  {errors.role && (
    <span className="text-red-500 2xl:text-sm ">
      {errors.role.message}
    </span>
  )}
</div>



          <div className="2xl:mb-1 flex flex-col items-center">
            <label
              htmlFor="Email"
              className="2xl:text-[22px] text-black-700 lg:ml-[-330px] lg:text-[14px] xl:text-[20px] 2xl:ml-[-750px] xl:ml-[-440px]"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="2xl:mt-1 block 2xl:w-full xl:text-[20px] lg:w-3/4  xl:w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            />
            {errors.email && (
              <span className="text-red-500 2xl:text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="2xl:mb-1 relative flex flex-col items-center">
            <label
              htmlFor="Password"
              className="2xl:text-[22px] text-black-700 lg:ml-[-290px] lg:text-[14px] xl:text-[20px] 2xl:ml-[-710px] xl:ml-[-400px]"
            >
              Password:
            </label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...register("password")}
              className="2xl:mt-1 block 2xl:w-full lg:w-3/4 xl:w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 2xl:pr-10 lg:p-1 xl:p-2"
            />
            <button
              type="button"
              className="2xl:absolute inset-y-0 lg:w-3/4 right-0 flex items-center 2xl:pr-3"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <AiOutlineEye className="2xl:h-5 2xl:w-5 text-blue-400 2xl:mt-8 2xl:mr-2 lg:ml-[340px] lg:mt-[-30px] 2xl:ml-[580px] xl:ml-[360px] xl:mt-[-38px]" />
              ) : (
                <AiOutlineEyeInvisible className="2xl:h-5 2xl:w-5 text-blue-400 2xl:mt-8 2xl:mr-2 lg:ml-[340px] lg:mt-[-30px] 2xl:ml-[580px] xl:ml-[360px] xl:mt-[-38px]" />
              )}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="2xl:mb-1 flex flex-col items-center relative">
            <label
              htmlFor="Confirm_Password"
              className="2xl:text-[22px] text-black-700 lg:ml-[-240px] lg:text-[14px] xl:text-[20px] 2xl:ml-[-620px] xl:ml-[-310px]"
            >
              Confirm Password:
            </label>
            <input
              id="confirm_password"
              type={confirmPasswordVisible ? "text" : "password"}
              {...register("confirm_password")}
              className="2xl:mt-1  lg:mt-[-4px] block 2xl:w-full lg:w-3/4  xl:w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 2xl:pr-10 lg:p-1 xl:p-2"
            />
            <button
              type="button"
              className="absolute inset-y-0 lg:w-3/4 right-0 flex items-center pr-3"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? (
                <AiOutlineEye className="2xl:h-5 2xl:w-5 text-blue-400 2xl:mt-8 2xl:mr-2 lg:ml-[280px] lg:mt-[14px] 2xl:ml-[580px] xl:ml-[300px] xl:mt-[20px]" />
              ) : (
                <AiOutlineEyeInvisible className="2xl:h-5 2xl:w-5 text-blue-400 2xl:mt-8 2xl:ml-[580px] lg:ml-[280px] lg:mt-[14px] xl:ml-[300px] xl:mt-[20px]" />
              )}
            </button>
            {errors.confirm_password && (
              <span className="text-red-500 2xl:text-sm">
                {errors.confirm_password.message}
              </span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className={`2xl:w-44 2xl:ml-[296px] 2xl:px-2 2xl:mt-12 2xl:text-[20px] lg:mb-[19px] ml-[33%] flex justify-center bg-[#008FFF] text-white 2xl:py-3 font-bold 2xl:rounded-[10px] lg:w-[99px]  xl:mt-8  lg:mt-[20px] lg:rounded-[10px] lg:ml-[190px] xl:w-28 xl:ml-46 xl:p-2 lg:p-2 "
              ${isSubmitting ? "opacity-40 cursor-not-allowed" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account...." : "Sign Up"}
            </button>
            {successMessage && (
              <p className="2xl:mt-2 text-green-500 text-center 2xl:text-sm 2xl:ml-30">
                {successMessage}
              </p>
            )}
            {apiError && (
              <p className="2xl:mt-2 text-red-500 text-center 2xl:text-sm">
                {apiError}
              </p>
            )}
          </div>

          <div className="2xl:mt-8  xl:mt-8 text-center 2xl:text-[22px] lg:text-[18px]">
            <span>Already have an account? </span>
            <Link
              href="/login"
              className="2xl:font-medium text-blue-600 hover:text-blue-500"
            >
              Log In
            </Link>
          </div>
        </form>

        <div>
          <Image
            src="/media/logo.png"
            alt="Sign Up Illustration"
            className="2xl:ml-[50px] 2xl:mt-[-15px] lg:ml-[30px] lg:w-[600px] lg:h-[200px] lg:mt-[-80px] xl:ml-[120px] xl:w-[1850px] xl:h-[260px] xl:mt-[5px] 2xl:w-[2000px] 2xl:h-[450px]"
            width={2000}
            height={1600}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

