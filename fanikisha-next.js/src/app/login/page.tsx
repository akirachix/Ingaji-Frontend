// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
// import { useRouter } from "next/navigation";
// import { userLogin } from "../utils/fetchlogin";
// import { setCookie } from "cookies-next";
// import Link from "next/link";
// import { LoginCredentials } from "../utils/types";

// const schema = Yup.object().shape({
//   Username: Yup.string().required('Username is required'),
//   password: Yup.string().required('Password is required'),
// });

// type FormData = Yup.InferType<typeof schema>;

// const LoginForm = () => {
//   const router = useRouter();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false); // Loading state

//   const formik = useFormik<FormData>({
//     initialValues: { Username: '', password: '' },
//     validationSchema: schema,
//     onSubmit: async (data: FormData) => {
//       setLoading(true);
  
//       const loginData: LoginCredentials = {
//           username: data.Username,
//           password: data.password,
//       };
  
//       try {
//           const response = await userLogin(loginData);
//           console.log({ response }); // Check the response content
  
//           if (response.error) {
//               setErrorMessage(response.error);
//               setSuccessMessage(null);
//           } else {
//               const role = response.role;
//               if (role) {
//                   setCookie('userRole', role, { path: '/' }); // Set cookie with a path
//                   console.log('Cookie Set:', 'userRole'); // Log the role to confirm
//                   // Redirect based on user role
//                   if (role === "Sacco") {
//                       router.push("/sacco/sacco-overview");
//                   } else if (role === "Cooperative") {
//                       router.push("/cooperative/Overview");
//                   } else {
//                       router.push("/sacco-overview");
//                   }
//               } else {
//                   console.error("Role is undefined in response.");
//                   setErrorMessage("Login failed. Role not defined.");
//               }
//               setErrorMessage(null); // Clear error
//           }
//       } catch (error) {
//           setErrorMessage("An error occurred during login.");
//           console.error("Login error:", error); // Log any errors from the API call
//       }
  
//       setLoading(false);
//   },
  
//   });

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleGoogleLogin = () => {
//     window.location.href = "https://fanikisha-3beb7fcefffe.herokuapp.com/auth/login";
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 border border-blue-400 shadow-md w-full sm:w-[1040px] h-auto">
//         <h1 className="text-5xl work-sans font-bold mb-6 mt-20 text-center">
//           Welcome Back!
//         </h1>
//         <p className="text-center mb-6 text-2xl">
//           Don&apos;t have an account?{" "}
//           <Link href="/login" className="2xl:font-medium text-blue-600 hover:text-blue-500">
//             Sign Up
//           </Link>
//         </p>

//         <form onSubmit={formik.handleSubmit}>
//           <div
//             aria-live="assertive"
//             className="text-red-500 text-sm mt-1 text-center"
//           >
//             {errorMessage && <span>{errorMessage}</span>}
//           </div>

//           <div className="mb-12 mt-24">
//             <label
//               htmlFor="Username"
//               className="block mb-2 text-2xl font-medium ml-32"
//             >
//               Username:
//             </label>
//             <input
//               id="Username"
//               name="Username"
//               type="text"
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               value={formik.values.Username}
//               className="w-full sm:w-[690px] px-3 py-4 border border-blue-400 rounded-lg ml-32"
//               aria-invalid={
//                 formik.touched.Username && Boolean(formik.errors.Username)
//               }
//               aria-describedby="username-error"
//             />
//             {formik.touched.Username && formik.errors.Username && (
//               <div id="username-error" className="text-red-500 text-sm mt-1">
//                 {formik.errors.Username}
//               </div>
//             )}
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="password"
//               className="block mb-2 text-2xl font-medium ml-32"
//             >
//               Password:
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={passwordVisible ? "text" : "password"}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//                 className="w-full sm:w-[690px] px-3 py-4 border border-blue-400 rounded-lg ml-32"
//                 aria-invalid={
//                   formik.touched.password && Boolean(formik.errors.password)
//                 }
//                 aria-describedby="password-error"
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-40 items-center pr-3 flex text-3xl text-blue-500"
//                 onClick={togglePasswordVisibility}
//                 aria-label={passwordVisible ? "Hide password" : "Show password"}
//               >
//                 {passwordVisible ? <MdVisibility /> : <MdOutlineVisibilityOff />}
//               </button>
//             </div>
//             {formik.touched.password && formik.errors.password && (
//               <div id="password-error" className="text-red-500 text-sm mt-1">
//                 {formik.errors.password}
//               </div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className={`w-40 ${loading ? "bg-gray-500" : "bg-blue-500"} text-white font-bold py-2 rounded-md hover:bg-blue-600 ml-96 mt-16 text-2xl`}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="mt-4 -ml-10 text-center">
//           <span className="text-gray-500 text-2xl">or</span>
//         </div>

//         <button
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className={`flex items-center justify-center ml-80 px-4 py-2 border mt-6 rounded-full border-blue-400 border-b-2`}
//         >
//           <Image
//             src="/images/google-icon.png"
//             alt="Google Icon"
//             width={30}
//             height={30}
//           />
//           <span
//             className={`ml-2 text-2xl font-work-sans ${loading ? "text-gray-400" : "text-gray-800"}`}
//           >
//             {loading ? "Signing in..." : "Sign in with Google"}
//           </span>
//         </button>
//       </div>

//       <div className="hidden lg:block ml-8 mb-20">
//         <Image
//           src="/images/login_vector.png"
//           alt="Login Illustration"
//           width={890}
//           height={820}
//         />
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
import { useRouter } from "next/navigation";
import { userLogin } from "../utils/fetchlogin";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { LoginCredentials } from "../utils/types";

const schema = Yup.object().shape({
  Username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

type FormData = Yup.InferType<typeof schema>;

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const formik = useFormik<FormData>({
    initialValues: { Username: '', password: '' },
    validationSchema: schema,
    onSubmit: async (data: FormData) => {
      setLoading(true);
  
      const loginData: LoginCredentials = {
        username: data.Username,
        password: data.password,
      };
  
      try {
        const response = await userLogin(loginData);
        console.log({ response }); // Check the response content
  
        if (response.error) {
          setErrorMessage(response.error);
          setSuccessMessage(null);
        } else {
          const role = response.role;
          if (role) {
            setCookie('userRole', role, { path: '/' }); // Set cookie with a path
            console.log('Cookie Set:', 'userRole'); // Log the role to confirm
            // Redirect based on user role
            if (role === "Sacco") {
              router.push("/sacco/sacco-overview");
            } else if (role === "Cooperative") {
              router.push("/cooperative/Overview");
            } else if (role === "Admin") {
              router.push("/admin/dashboard");
            } else {
              router.push("/sacco-overview");
            }
          } else {
            console.error("Role is undefined in response.");
            setErrorMessage("Login failed. Role not defined.");
          }
          setErrorMessage(null); // Clear error
        }
      } catch (error) {
        setErrorMessage("An error occurred during login.");
        console.error("Login error:", error); // Log any errors from the API call
      }
  
      setLoading(false);
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://fanikisha-3beb7fcefffe.herokuapp.com/auth/login";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 border border-blue-400 shadow-md w-full sm:w-[1040px] h-auto">
        <h1 className="text-5xl work-sans font-bold mb-6 mt-20 text-center">
          Welcome Back!
        </h1>
        <p className="text-center mb-6 text-2xl">
          Don&apos;t have an account?{" "}
          <Link href="/login" className="2xl:font-medium text-blue-600 hover:text-blue-500">
            Sign Up
          </Link>
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div aria-live="assertive" className="text-red-500 text-sm mt-1 text-center">
            {errorMessage && <span>{errorMessage}</span>}
          </div>

          <div className="mb-12 mt-24">
            <label
              htmlFor="Username"
              className="block mb-2 text-2xl font-medium ml-32"
            >
              Username:
            </label>
            <input
              id="Username"
              name="Username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Username}
              className="w-full sm:w-[690px] px-3 py-4 border border-blue-400 rounded-lg ml-32"
              aria-invalid={
                formik.touched.Username && Boolean(formik.errors.Username)
              }
              aria-describedby="username-error"
            />
            {formik.touched.Username && formik.errors.Username && (
              <div id="username-error" className="text-red-500 text-sm mt-1">
                {formik.errors.Username}
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
                type={passwordVisible ? "text" : "password"}
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
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? <MdVisibility /> : <MdOutlineVisibilityOff />}
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
};

export default LoginForm;
