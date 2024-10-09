import React from "react";
// import Landing from "./landing/page";
//  import MugugaCooperative from './miguga_cooperative/page';
//  import LoginForm from './login/page';
//  import Landing from "./landing/page";
//  import SignUp from "./sign-Up/page";
// import Overview from "./Overview";
// import MilkCollectionPage from "./milk-record";
import MilkRecords from "./(cooperative)/cooperative/milk-record/page";
// import Landing from "./landing/page";
export default function RootLayout() {
  return (
    <div>
      {/* <Landing/> */}
        <MilkRecords/>
    </div>
  );
}
