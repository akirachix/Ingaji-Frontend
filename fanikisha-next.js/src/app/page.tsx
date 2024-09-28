import React from "react";
import Overview from './components/Overview';
import SignUp from './sign-Up/page';
import LoginForm from './login/page';


export default function RootLayout() {
  return (
    <div>
      <LoginForm/>
         <SignUp/>
      <Overview />
    </div>
  );
}
