"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <nav className="bg-gradient-to-r from-honey-amber via-[#FFE0A3] to-honey-amber border-b-4 border-honey-dark sticky top-0 left-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo e Título */}
          <div className="flex items-center space-x-4">
            {/* Honeycomb Logo */}
            <div className="relative">
              <div className="p-3 rounded-lg transform hover:rotate-12 transition-transform">
                <div className="flex items-center justify-center w-16 h-16">
                  <img
                    src="/images/logoHoneycomb.svg"
                    alt="Honeycomb logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Título */}
            <div>
              <span className="text-3xl font-bold text-[#4a3329] drop-shadow-lg">
                Honeycomb
              </span>
              <p className="text-s text-[#4a3329] font-medium">
                Sistema de Reservas
              </p>
            </div>
          </div>

          {/* Botão Admin/User */}
          <div className="flex items-center">
            <Link
              href={isAdmin ? "/admin" : "/"}
              className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2 rounded-full border border-[#4a3329] text-[#4a3329] font-medium hover:bg-[#FFE0A3] transition-colors"
              onClick={() => setIsAdmin(!isAdmin)}
            >
              {isAdmin ? "Admin" : "User"}
            </Link>
          </div>
        </div>
      </div>

      {/* Honeycomb pattern decoration */}
      <div className="h-1 bg-gradient-to-r from-transparent via-honey-amber to-transparent opacity-50"></div>
    </nav>
  );
}
