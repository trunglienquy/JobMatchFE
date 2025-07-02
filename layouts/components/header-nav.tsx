"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";

function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="px-10 mx-auto max-w-7xl">
        <div className="flex justify-between items-center h-[5rem]">
          <div onClick={() => { window.location.href = routes.home; }} className="text-3xl font-bold text-blue-600 cursor-pointer">JobMatch</div>
          <nav className="space-x-4">
            <Button className="cursor-pointer bg-blue-600 text-white" variant="outline" onClick={() => { window.location.href = routes.login; }}>Login</Button>
            <Button className="cursor-pointer text-black" variant="outline" onClick={() => { window.location.href = routes.register; }}>Register</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;