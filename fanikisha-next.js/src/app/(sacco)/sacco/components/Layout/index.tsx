'use client';
import React from 'react';
import Sidebar from '../Sidebar';
import Overview from '@/app/sacco_overview/page';
export default function Layout({ children, showMuguga }: { children: React.ReactNode, showMuguga?: boolean }) {
  return (
    <div className="flex min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow p-4">
        {showMuguga ? <Overview /> : children} 
      </div>
    </div>
  );
}
