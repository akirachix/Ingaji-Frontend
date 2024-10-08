import React from "react";
//  import MugugaCooperative from './miguga_cooperative/page';
//  import LoginForm from './login/page';
//  import Landing from "./landing/page";
//  import SignUp from "./sign-Up/page";
// import Overview from "./Overview";
import MilkRecords from "./milk-record/page";
import MilkCollectionPage from "./Milk";

// import Landing from "./landing/page";

export default function RootLayout() {
  return (
    <div>
      {/* <Overview/>
   
     <SignUp/>
      
      <MugugaCooperative/>
          <Landing/> */}
        {/* <LoginForm/> */}
        <MilkRecords/>
        <MilkCollectionPage/>
      {/* <Landing /> */}

    </div>
  );
}
