import React from "react";
import Landing from "./Landing/page";
import Layout from "./components/Layout";
import Overview from "./components/Overview";
import Sidebar from "./(sacco)/sacco/components/SideBar";


export default function RootLayout() {
  return (
  
    <div>
      <Overview/>
     {/* <Landing/> */}
    </div>
   
  );
}
