import React from "react";
import FarmersDashboard from "./farmers-accounts/page";
import Layout from './components/Layout';
import SignUp from './sign-Up/page';
import LoginForm from './login/page';
import MilkRecords from "./(sacco)/sacco/milk-record/page";
import Overview from "./Overview";



export default function RootLayout() {
  return (
      
        <div >
        <Overview/>
        <SignUp/>
        <MilkRecords/>
      <Overview/>
        </div>
        


  )
}


