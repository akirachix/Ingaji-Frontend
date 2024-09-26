
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userSignup } from "@/app/utils/postUserCredentials";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface userData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  password: string;
}


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

  const onSubmit = async (data: userData) => {
    try {  
      
      const response = await userSignup(data);

      if (response.error){
        setErrorMessage(response.error)
      }

      else{

       
       Cookies.set("userData", JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        role: data.role,
      }), { expires: 7 }); 

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
    <div className="flex justify-center items-center px-6 min-h-screen bg-white-100 font-work sans">
      <div className="w-[1250px] flex justify-between items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[2780px] container mx-2xl py-[-180px] px-20  bg-white border border-blue-500 border-2 shadow-md mt-1 ml-[-220px]"
        >
          <h1 className="text-[50px]  mb-4 text-blue-500 font-bold text-center">Sign Up</h1>

          <div className="mb-1 flex flex-col items-center">
            <label htmlFor="First_name" className="text-[22px] text-black-700 ml-[-600px]">
              First Name:
            </label>
            <input
              id="First_name"
              {...register("first_name")}
              className="mt-1 block w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            />
            {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name.message}</span>}
          </div>

          <div className="mb-1 flex flex-col items-center">
            <label htmlFor="Last_name" className="text-[22px] text-black-700 ml-[-600px]">
              Last Name:
            </label>
            <input
              id="Last_name"
              {...register("last_name")}
              className="mt-1 block w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            />
            {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name.message}</span>}
          </div>

          <div className="mb-1 flex flex-col items-center">
            <label htmlFor="username" className="text-[22px] text-black-700 ml-[-600px]">
              Username:
            </label>
            <input
              id="username"
              {...register("username")}
              className="mt-1 block w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            />
            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
          </div>

          <div className="mb-1 flex flex-col items-center">
            <label htmlFor="Role" className="text-[22px] text-black-700 ml-[-660px]">Role:</label>
            <select
              id="Role"
              {...register("role")}
              className="mt-1 block w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            >
              <option value="">Select Role</option>
              <option value="cooperative">Cooperative</option>
              <option value="sacco">Sacco</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
          </div>

          <div className="mb-1 flex flex-col items-center">
            <label htmlFor="Email" className="text-[22px] text-black-700 ml-[-650px]">Email:</label>
            <input
              id="Email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-1 relative flex flex-col items-center">
            <label htmlFor="Password" className="text-[22px] text-black-700 ml-[-610px]">Password:</label>
            <input
              id="Password"
              type={passwordVisible ? "text" : "password"}
              {...register("password")}
              className="mt-1 block w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick ={togglePasswordVisibility}
            >
              {passwordVisible ? <Eye className="h-5 w-5 text-blue-400 mt-8 mr-2" /> : <EyeOff className="h-5 w-5 text-blue-400 mt-8 mr-2" />}
            </button>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <div className="mb-1 flex flex-col items-center relative">
            <label htmlFor="Confirm_Password" className="text-[22px] text-black-700 ml-[-530px]">Confirm Password:</label>
            <input
              id="Confirm_Password"
              type={confirmPasswordVisible ? "text" : "password"}
              {...register("confirm_password")}
              className="mt-1 block w-full border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick = {toggleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? <Eye className="h-5 w-5 text-blue-400 mt-8 mr-2" /> : <EyeOff className="h-5 w-5 text-blue-400 mt-8 mr-2" />}
            </button>
            {errors.confirm_password && <span className="text-red-500 text-sm">{errors.confirm_password.message}</span>}
          </div>
          <div>
            <button
              type="submit"
              className={`w-44 mt-2 ml-[33%] flex justify-center bg-[#008FFF] text-white py-2 font-bold rounded-[10px] hover:bg-[#EF5B1C]"
              ${isSubmitting ? "opacity-40 cursor-not-allowed" : ""
              }`}
              disabled = {isSubmitting}>
              {isSubmitting ? "Creating account...." : "Signup"}
            </button>
           {successMessage && (
              <p className="mt-2 text-green-500 text-center text-sm ml-30">
                {successMessage}
              </p>
            )}
             {apiError && (
              <p className="mt-2 text-red-500 text-center text-sm">
                {apiError}
              </p>
            )}
          </div>
           
          <div className="mt-3 text-center text-[22px]">
            <span>Already have an account? </span>
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Log In</a>
          </div>
        </form>
      
        <div>
          <Image
            src="/media/login2.png"
            alt="Sign Up Illustration"
            className="ml-[160px]"
            width={2000}
            height={1600}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;































































// // {/* <div className="mb-4 flex flex-col items-center">
// //         <label htmlFor="Sacco_name" className="text-[22px] text-black-700 ml-[-480px]">Role:</label>
// //         <input
// //           id="Role"
// //           {...register('Role')}
// //           className="mt-1 block w-10/12 border border-blue-500 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
// //         />
// //         {errors.Role && <span className="text-red-500 text-sm">{errors.Role.message}</span>}
// //       </div> */}