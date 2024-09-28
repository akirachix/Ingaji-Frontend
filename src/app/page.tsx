import Layout from "./(admin)/admin/components/Layout";
import React from "react";
import LoginForm from './login/page';
import Overview from "./components/Overview";
import SignUp from "./sign-Up/page";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
        <div >
        <LoginForm/>
        <Overview/>
        <SignUp/>
        </div>
      
      </Layout>

  )}
