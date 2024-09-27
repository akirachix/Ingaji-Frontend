
import Image from "next/image";
// import Reset from "./Reset ";
// import Login from './login/page'; 
// import  Otp from './Otp';
// import Forgot from './Forgot password';
import MilkRecordsTable  from './Milk ';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
    {/* <Reset/> */}
      {/* <Login/> */}
         {/* <Otp/>
      <Forgot/> */}
      <MilkRecordsTable/>
    </div>
  );
}



