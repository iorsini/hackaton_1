"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <nav className="bg-gradient-to-r from-[#FFD966] via-[#FFE0A3] to-[#FFD966] border-b-4 border-[#E69500] sticky top-0 left-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo e Título */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative p-2 sm:p-3 rounded-lg transform hover:rotate-12 transition-transform">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <Image
                  src="/images/logoHoneycomb.svg"
                  alt="Honeycomb logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div>
              <span className="text-xl sm:text-3xl font-bold text-[#4a3329] drop-shadow-lg">
                Honeycomb
              </span>
              <p className="text-xs sm:text-sm text-[#4a3329] font-medium hidden sm:block">
                Sistema de Reservas
              </p>
            </div>
          </Link>

          {/* Botão Admin/User */}
          <Link
            href={isAdmin ? "/admin" : "/"}
            className="bg-white bg-opacity-50 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#4a3329] text-[#4a3329] font-medium hover:bg-[#FFE0A3] transition-colors text-sm sm:text-base active:scale-95"
            onClick={() => setIsAdmin(!isAdmin)}
          >
            {isAdmin ? "Admin" : "User"}
          </Link>
        </div>
      </div>

      {/* Honeycomb pattern decoration */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#FFD966] to-transparent opacity-50"></div>
    </nav>
  );
}