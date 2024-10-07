import React from "react";
import Overview from "./(cooperative)/cooperative/Overview/page";
import LoginForm from './login/page';
import Landing from "./landing/page";



export default function RootLayout() {
  return (
      
        <div >
          <Landing/>
        <Overview/>
        <LoginForm/>
        
  
        
        </div>
        
  )
}
