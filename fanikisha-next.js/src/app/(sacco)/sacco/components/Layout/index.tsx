'use client';
import React from 'react';
import Sidebar from '@/app/components/Sidebar';
import Overview from '@/app/components/Overview';
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
