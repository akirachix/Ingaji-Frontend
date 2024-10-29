"use client"
import React from "react";
import Landing from "./landing/page";
import FarmerDetails from "./(sacco)/sacco/checkeligibility/page";


export default function RootLayout() {
  return (
      
        <div >
          {/* <Landing/> */}
          <FarmerDetails/>
        </div>
        
  )
}

