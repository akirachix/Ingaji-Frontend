import React from "react";
import FarmersDashboard from "./farmers-accounts/page";
import Layout from './components/Layout';
import Overview from './components/Overview';
import SignUp from './sign-Up/page';
import LoginForm from './login/page';


export default function RootLayout() {
  return (
      
        <div >
        <Overview/>
        <SignUp/>
        </div>
        

  );
}
