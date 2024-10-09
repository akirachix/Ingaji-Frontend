"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  RiDashboardLine,
  RiFileList3Line,
  RiUser3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showSignOutDropdown, setShowSignOutDropdown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { name: "Overview", icon: RiDashboardLine, path: "/cooperative/Overview" },
    { name: "Milk records", icon: RiFileList3Line, path: "/cooperative/milk-record" },
    { name: "Accounts", icon: RiUser3Line, path: "/cooperative/farmeraccounts" },

  ];

  const handleSignOut = async () => {
    if (!isMounted) return;
    try {
      const response = await fetch(
        "https://fanikisha-3beb7fcefffe.herokuapp.com/api/logout/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "logout" }),
        }
      );

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Error logging out");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleYesClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSignOut();
    setShowSignOutDropdown(false);
  };

  if (!isMounted) return null;

  return (
    <div className="bg-blue-500 text-white 2xl:h-screen w-64 flex flex-col items-center font-worksans relative lg:h-[88%] xl:h-[102%] ">
      <div className="py-6">
        <Image
          src="/image/fanikisha.png"
          alt="Fanikisha Logo"
          width={140}
          height={30}
          className="object-contain"
        />
      </div>
      <nav className="flex-grow flex flex-col justify-center items-center w-full">
        <ul className="space-y-6 text-center w-full text-lg">
          {navItems.map((item) => (
            <li key={item.name} className="w-full">
              <Link
                href={item.path}
                className={`px-4 py-3 flex items-center justify-start ${
                  pathname === item.path
                    ? "border-l-4 border-white bg-blue-600"
                    : ""
                } hover:font-bold hover:underline`}
              >
                <div className="flex items-center justify-center w-10">
                  <item.icon size={28} className="mr-3" />
                </div>
                <span className="ml-3 text-xl">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="py-6 w-full relative">
        <button
          className="w-full flex items-center justify-center text-white hover:text-gray-200 py-3"
          onClick={() => setShowSignOutDropdown(!showSignOutDropdown)}
        >
          <div className="flex items-center justify-center w-10">
            <RiLogoutBoxRLine size={28} className="mr-3" />
          </div>
          <span className="ml-3 text-xl">Sign Out</span>
        </button>
        {showSignOutDropdown && (
          <div className="absolute bottom-full left-0 w-full bg-white text-blue-500 rounded-t-md shadow-md text-sm">
            <p className="p-3 text-center">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-around p-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                onClick={handleYesClick}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-blue-500 px-4 py-2 rounded hover:bg-gray-400 text-sm"
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
