"use client";
import React from 'react';


import SignUp from '@/app/sign-Up/page';
import Sidebar from '@/app/(cooperative)/cooperative/components/Sidebar';
// import Sidebar from '@/app/(sacco)/sacco/components/Sidebar';



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div>
      <Sidebar/>
      <Sidebar/>
      </div>
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
}