'use client';
import React from 'react';
import Sidebar from '../Sidebar';
import MugugaCooperative from '@/app/miguga_cooperative/page';

export default function Layout({ children, showMuguga }: { children: React.ReactNode, showMuguga?: boolean }) {
  return (
    <div className="flex min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow p-4">
        {showMuguga ? <MugugaCooperative /> : children} 
      </div>
    </div>
  );
}
