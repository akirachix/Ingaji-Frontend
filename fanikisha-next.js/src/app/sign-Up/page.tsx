"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userSignup } from "../utils/postUserCredentials";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from 'cookies-next'; 

const schema = yup.object().shape({
  first_name: yup.string().required("first name is required"),
  last_name: yup.string().required("last name is required"),
  username: yup.string().required("username is required"),
  role: yup.string().required("Role is required"),
  email: yup.string().email("Invalid email address").required("email is required"),
  password: yup.string().min(6, "password must be at least 6 characters").required("Password is required"),
  confirm_password: yup.string().oneOf([yup.ref("password"), undefined], "Passwords must match").required("Confirm Password is required"),
});


type FormData = yup.InferType<typeof schema>

const SignUp = () => {
  const router =useRouter();
  const {register,handleSubmit,formState: { errors, isSubmitting },} = useForm<FormData>({
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

      if (response.error){
        setErrorMessage(response.error)
      }
      else{
        setCookie('userRole', formData.role, { maxAge: 60 * 60 * 24, path: '/' })
      setSuccessMessage("Account created successfully! Let's go to login...");
      setTimeout(()=>{router.push("/login")},2000);
       
      }}
     catch (error) {
       setErrorMessage((error as Error).message)
       console.error('registration error:',error)

       if (error instanceof Response) {
        const errorData = await error.json().catch(() => null);
        const errorMessage = errorData?.message || 'Something went wrong during registration.';
        setErrorMessage(errorMessage);
      } else if (error instanceof Error) {
        setErrorMessage(error.message || 'Something went wrong');
      } else {
        setErrorMessage('An unknown error occurred');
      }
    
    }
  };

  const togglePasswordVisibility = () =>{
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="flex justify-center items-center lg:px-2   xl:px-4 lg:flex justify-center items-centre 2xl:px-6 2xl:min-h-screen lg:min-h-3.5 bg-white-100 font-work sans">
      <div className="2xl:w-[1250px] lg:w-[700px] flex justify-between items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="2xl:w-[2780px] lg:w-[1000px] xl:w-[1900px] 2xl:container 2xl:mx-auto 2xl:py-[30px] lg:py-[32px] xl:py-[44px] lg:px-1 xl:px-12 2xl:px-18 bg-white border border-blue-500 border-2 shadow-md 2xl:mt-1 2xl:ml-[-220px] lg:ml-[-100px] xl:ml-[-150px] "

        >
          <h1 className="2xl:text-[50px]  2xl:mb-4 lg:mb-[-5px] xl:mb-[4px] text-blue-500 font-bold text-center lg:text-[40px] xl:text-[48px] 2xl:mt-[-30px]">Sign Up</h1>

          <div className="mb-1 flex flex-col items-center">
            <label htmlFor="First_name" className="2xl:text-[22px]  lg:text-[14px]  xl:text-[20px] text-black-700 2xl:ml-[-630px] lg:ml-[-290px] xl:ml-[-300px]">
              First Name:
            </label>
            <input
              id="first_name"
              {...register("first_name")}
              className="2xl:mt-1 block 2xl:w-full lg:w-3/4  xl:w-full border border-blue-500 rounded-md shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            />
            {errors.first_name && <span className="2xl:text-red-500 2xl:text-sm">{errors.first_name.message}</span>}
          </div>

          <div className="2xl:mb-1 flex flex-col items-center">
            <label htmlFor="Last_name" className="2xl:text-[22px] xl:text-[20px] text-black-700 2xl:ml-[-630px] lg:ml-[-290px] lg:text-[14px] xl:ml-[-300px]">
              Last Name:
            </label>
            <input
              id="last_name"
              {...register("last_name")}
              className="2xl:mt-1 block 2xl:w-full lg:w-3/4 xl:w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            />
            {errors.last_name && <span className="text-red-500 2xl:text-sm">{errors.last_name.message}</span>}
          </div>

          <div className="2xl:mb-1 flex flex-col items-center">
            <label htmlFor="username" className="2xl:text-[22px] xl:text-[20px] text-black-700 2xl:ml-[-630px] lg:ml-[-290px] lg:text-[14px] xl:ml-[-300px]">
              Username:
            </label>
            <input
              id="username"
              {...register("username")}
              className="2xl:mt-1 block 2xl:w-full lg:w-3/4 border xl:w-full border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            />
            {errors.username && <span className="text-red-500 2xl:text-sm">{errors.username.message}</span>}
          </div>

          <div className="mb-1 flex flex-col items-center">
            <label htmlFor="Role" className="2xl:text-[22px] text-black-700 lg:ml-[-330px] lg:text-[14px] xl:text-[20px] xl:ml-[-300px] 2xl:ml-[-690px]">Role:</label>
            <select
              id="role"
              {...register("role")}
              className="2xl:mt-1 block 2xl:w-full lg:w-3/4 border xl:text-[20px] xl:w-full border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            >
              <option value="">Select Role</option>
              <option value="cooperative">Cooperative</option>
              <option value="sacco">Sacco</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <span className="text-red-500 2xl:text-sm">{errors.role.message}</span>}
          </div>

          <div className="2xl:mb-1 flex flex-col items-center">
            <label htmlFor="Email" className="2xl:text-[22px] text-black-700 lg:ml-[-330px] lg:text-[14px] xl:text-[20px] 2xl:ml-[-690px]">Email:</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="2xl:mt-1 block 2xl:w-full xl:text-[20px] lg:w-3/4  xl:w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 2xl:p-3 lg:p-1 xl:p-2"
            />
            {errors.email && <span className="text-red-500 2xl:text-sm">{errors.email.message}</span>}
          </div>

          <div className="2xl:mb-1 relative flex flex-col items-center">
            <label htmlFor="Password" className="2xl:text-[22px] text-black-700 lg:ml-[-290px] lg:text-[14px] xl:text-[20px] 2xl:ml-[-650px]">Password:</label>
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
            <AiOutlineEye className="2xl:h-5 2xl:w-5 text-blue-400 2xl:mt-8 2xl:mr-2 lg:ml-[340px] lg:mt-[-30px] 2xl:ml-[520px]" />
          ) : (
            <AiOutlineEyeInvisible className="2xl:h-5 2xl:w-5 text-blue-400 2xl:mt-8 2xl:mr-2 lg:ml-[340px] lg:mt-[-30px] 2xl:ml-[520px]" />
          )}
        </button>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <div className="2xl:mb-1 flex flex-col items-center relative">
            <label htmlFor="Confirm_Password" className="2xl:text-[22px] text-black-700 lg:ml-[-240px] lg:text-[14px] xl:text-[20px] 2xl:ml-[-550px]">Confirm Password:</label>
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
            <AiOutlineEye className="2xl:h-5 2xl:w-5 text-blue-400 2xl:mt-8 2xl:mr-2 lg:ml-[380px] lg:mt-[-60px] 2xl:ml-[520px]" />
          ) : (
            <AiOutlineEyeInvisible className="2xl:h-5 2xl:w-5 text-blue-400 2xl:mt-8 2xl:ml-[520px] lg:ml-[280px] lg:mt-[20px]" />
          )}
        </button>
            {errors.confirm_password && <span className="text-red-500 2xl:text-sm">{errors.confirm_password.message}</span>}
          </div>
          <div>
            <button
              type="submit"
              className={`2xl:w-44 2xl:ml-[256px] 2xl:mt-12 lg:mb-[19px] ml-[33%] flex justify-center bg-[#008FFF] text-white 2xl:py-2 font-bold 2xl:rounded-[10px] lg:w-[99px]  xl:mt-8  lg:mt-[20px] lg:rounded-[10px] lg:ml-[190px] xl:w-28 xl:ml-36 xl:p-4 "
              ${isSubmitting ? "opacity-40 cursor-not-allowed" : ""
              }`}
              disabled = {isSubmitting}>
              {isSubmitting ? "Creating account...." : "Signup"}
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
            <a href="#" className="2xl:font-medium text-blue-600 hover:text-blue-500">Log In</a>
          </div>
        </form>
      
        <div>
          <Image
            src="/media/login2.png"
            alt="Sign Up Illustration"
            className="2xl:ml-[160px] lg:ml-[100px] lg:w-[500px] lg:h-[350px] lg:mt-[-80px] xl:ml-[200px] xl:w-[1250px] xl:h-[450px] xl:mt-[45px] 2xl:w-[2000px] 2xl:h-[600px]"
            width={2000}
            height={1600}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;












