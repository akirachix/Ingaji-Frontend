import React from "react";
import Overview from './components/Overview';
import LoginForm from './login/page';
import Landing from "./landing/page";


export default function RootLayout() {
  return (
      
        <div >
          <Landing/>
        <Overview/>
        <LoginForm/>
        
        
        
        
        </div>
        

   
  );
}
