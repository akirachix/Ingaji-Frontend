"use client"
import React from "react";
import Landing from "./landing/page";
import CooperativeDashboard from "./(sacco)/sacco/cooperativeFarmers/page";
import FarmerDetails from "./(sacco)/sacco/checkEligibility/page";


export default function RootLayout() {
  return (
      
        <div >
          {/* <Landing/> */}
          {/* <CooperativeDashboard/> */}
          <FarmerDetails/>

        </div>
        
  )
}

