"use client"
import React from "react";
import Landing from "./landing/page";
import CooperativeDashboard from "./(sacco)/sacco/cooperativeFarmers/page";
// import LoginForm from "./login/page";


export default function RootLayout() {
  return (
      
        <div >
          <Landing/>
          {/* <CooperativeDashboard/> */}
          {/* <LoginForm/> */}
        </div>
        
  )
}

