'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { RiDashboardLine, RiFileList3Line, RiUser3Line, RiLogoutBoxRLine } from 'react-icons/ri';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showSignOutDropdown, setShowSignOutDropdown] = useState(false);

  const navItems = [
    { name: 'Overview', icon: RiDashboardLine, path: '/overview' },
    { name: 'Milk records', icon: RiFileList3Line, path: 'components/milkRecordsPage' },
    { name: 'Accounts', icon: RiUser3Line, path: '/accounts' },
  ];

  const handleSignOut = () => {
    console.log('User signed out');
    router.push('/login');
  };

  return (
    <div className="bg-blue-500 text-white h-screen w-64 flex flex-col items-center font-worksans relative:">
      <div className="py-10">
        <Image
          src="/image/fanikisha.png"
          alt="Fanikisha Logo"
          width={200}
          height={40}
          className="object-contain"
        />
      </div>
      <nav className="flex-grow flex flex-col justify-center items-center">
        <ul className="space-y-8 text-center w-full text-base">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link
                href={item.path}
                className={`px-5 py-3 flex items-center justify-start ${
                  pathname === item.path ? 'border-l-4 border-white bg-blue-600' : ''
                } hover:font-bold hover:underline text-xl`}
              >
                <div className="flex items-center justify-center w-10">
                  <item.icon size={48} className="mr-3" />
                </div>
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="py-10 w-full relative">
        <button
          className="w-full flex items-center justify-center text-white hover:text-gray-200 py-3"
          onClick={() => setShowSignOutDropdown(!showSignOutDropdown)}
        >
          <div className="flex items-center justify-center w-10">
            <RiLogoutBoxRLine size={40} className="mr-3" />
          </div>
          <span className="ml-3 text-xl">Sign Out</span>
        </button>
        {showSignOutDropdown && (
          <div className="absolute bottom-full left-0 w-full bg-white text-blue-500 rounded-t-md shadow-md">
            <p className="p-3 text-center">Are you sure you want to sign out?</p>
            <div className="flex justify-around p-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSignOut}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-blue-500 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowSignOutDropdown(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
