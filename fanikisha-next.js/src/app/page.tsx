'use client';
import React from 'react';
import MugugaCooperative from './miguga_cooperative/page';
// import SignUp from './sign-Up/page';
import Overview from './Overview';
import LoginForm from './login/page';
import Landing from "./landing/page";


const Home: React.FC = () => {
  return (
      <div>
        {/* /* <SignUp/> */}
      
        <MugugaCooperative/>
          <Landing/>
        <Overview/>
        <LoginForm/>
        
        
        
        
        </div>
        

   
  );
};

export default Home;
