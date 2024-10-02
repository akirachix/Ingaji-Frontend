'use client';
import React from 'react';
import SignUp from './sign-Up/page';
import Overview from './Overview';

const Home: React.FC = () => {
  return (
      <div>
        <SignUp/>
        <Overview/>
      </div>
  );
};

export default Home;
