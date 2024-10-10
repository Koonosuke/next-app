// Header.tsx

"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-wide">
          <Link href="/" legacyBehavior>
            <a>MyPortfolio</a>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav
          className={`md:flex md:items-center md:space-x-6 ${
            isOpen ? "block" : "hidden"
          } md:block transition-all duration-300 ease-in-out`}
        >
          <Link href="/" legacyBehavior>
            <a className="block mt-4 md:inline-block md:mt-0 text-lg font-semibold hover:text-yellow-300">
              Home
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="block mt-4 md:inline-block md:mt-0 text-lg font-semibold hover:text-yellow-300">
              About
            </a>
          </Link>
          <Link href="/portfolio" legacyBehavior>
            <a className="block mt-4 md:inline-block md:mt-0 text-lg font-semibold hover:text-yellow-300">
              Portfolio
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
