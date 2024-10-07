'use client';
import React from "react";
//  import MugugaCooperative from './miguga_cooperative/page';
//  import LoginForm from './login/page';
//  import Landing from "./landing/page";
//  import SignUp from "./sign-Up/page";
// import Overview from "./Overview";
import MilkRecords from "./milk-record/page";
import MilkCollectionPage from "./Milk";


const Home: React.FC = () => {
  return (

    <div>
      {/* <Overview/>
   
     <SignUp/>
      
      <MugugaCooperative/>
          <Landing/> */}
        {/* <LoginForm/> */}
        <MilkRecords/>
        <MilkCollectionPage/>

    </div>

   
  );
};

export default Home;
