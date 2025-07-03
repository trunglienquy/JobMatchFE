"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";
import { STORAGE_KEY } from "@/constants/common";
import { User, LogOut } from "lucide-react";
import Cookies from "js-cookie";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = Cookies.get(STORAGE_KEY.EC_TOKEN);
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove(STORAGE_KEY.EC_TOKEN);
    Cookies.remove(STORAGE_KEY.EC_USER);
    setIsAuthenticated(false);
    window.location.href = routes.home;
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="px-10 mx-auto max-w-7xl">
        <div className="flex justify-between items-center h-[6rem]">
          <div onClick={() => { window.location.href = routes.home; }} className="text-[2.5rem] font-bold text-blue-600 cursor-pointer">JobMatch</div>
          <nav className="space-x-4">
            {!isMounted ? (
              <div className="flex space-x-4">
                <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-blue-600">
                  <User size={24} />
                  <span className="text-[1.2rem]">Profile</span>
                </div>
                <Button 
                  className="text-[1.2rem] cursor-pointer bg-red-600 text-white hover:bg-red-700" 
                  variant="outline" 
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button className="text-[1.5rem] cursor-pointer bg-blue-600 text-white" variant="outline" onClick={() => { window.location.href = routes.login; }}>Login</Button>
                <Button className="text-[1.5rem] cursor-pointer text-black" variant="outline" onClick={() => { window.location.href = routes.register; }}>Register</Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;