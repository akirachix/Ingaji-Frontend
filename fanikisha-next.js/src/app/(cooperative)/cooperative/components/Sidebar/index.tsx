'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { RiDashboardLine, RiFileList3Line, RiUser3Line, RiLogoutBoxRLine } from 'react-icons/ri';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showSignOutDropdown, setShowSignOutDropdown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { name: 'Overview', icon: RiDashboardLine, path: '/overview' },
    { name: 'Milk records', icon: RiFileList3Line, path: '/milk-records' },
    { name: 'Accounts', icon: RiUser3Line, path: '/accounts' },
  ];

  const handleSignOut = async () => {
    if (!isMounted) return;
    try {
      const response = await fetch('https://fanikisha-3beb7fcefffe.herokuapp.com/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'logout' }),
      });
      
      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Error logging out');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleYesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSignOut();
    setShowSignOutDropdown(false);
  };

  if (!isMounted) return null;

  return (
    <div className="bg-blue-500 text-white h-screen w-48 flex flex-col items-center font-worksans relative">
      <div className="py-4">
        <Image
          src="/image/fanikisha.png"
          alt="Fanikisha Logo"
          width={120}
          height={24}
          className="object-contain"
        />
      </div>
      <nav className="flex-grow flex flex-col justify-center items-center w-full">
        <ul className="space-y-4 text-center w-full text-sm">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link
                href={item.path}
                className={`px-3 py-2 flex items-center justify-start ${
                  pathname === item.path ? 'border-l-2 border-white bg-blue-600' : ''
                } hover:font-bold hover:underline text-base`}
              >
                <div className="flex items-center justify-center w-8">
                  <item.icon size={20} className="mr-2" />
                </div>
                <span className="ml-2">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="py-4 w-full relative">
        <button
          className="w-full flex items-center justify-center text-white hover:text-gray-200 py-2"
          onClick={() => setShowSignOutDropdown(!showSignOutDropdown)}
        >
          <div className="flex items-center justify-center w-8">
            <RiLogoutBoxRLine size={20} className="mr-2" />
          </div>
          <span className="ml-2 text-base">Sign Out</span>
        </button>
        {showSignOutDropdown && (
          <div className="absolute bottom-full left-0 w-full bg-white text-blue-500 rounded-t-md shadow-md text-sm">
            <p className="p-2 text-center">Are you sure you want to sign out?</p>
            <div className="flex justify-around p-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-blue-500 px-3 py-1 rounded hover:bg-gray-400 text-xs"
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