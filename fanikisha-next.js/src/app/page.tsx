import React from "react";
import Overview from './components/Overview';
import SignUp from './sign-Up/page';
import LoginForm from './login/page';
import Landing from "./landing/page";


export default function RootLayout() {
  return (
      
        <div >
          <Landing/>
          {/* <SignUp/> */}
        <Overview/>
        <LoginForm/>
        
        
        
        
        </div>
        

   
  );
}
