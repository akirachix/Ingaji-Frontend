"use client";
import React from 'react';
import Sidebar from '../Sidebar';
// import MemberPage from '@/app/(cooperative)/cooperative/member/[userId]/page';

export default function Layout({ children, }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar/>
      {children} 
    </div>
  );
}
