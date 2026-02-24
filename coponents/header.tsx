"use client";

import { usePathname } from "next/navigation";


export default function Header() {
  const pathname = usePathname();

  // Hide header on login page
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className="flex items-center justify-between font-bold text-2xl">
    
      <h1>My Tasks</h1>
      
    </header>
  );
}
