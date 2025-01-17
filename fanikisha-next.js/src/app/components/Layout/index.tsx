"use client";
import React from 'react';


import Sidebar from '@/app/(cooperative)/cooperative/components/Sidebar';



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