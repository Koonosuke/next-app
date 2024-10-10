// home/page.tsx

"use client";
import Image from "next/image";
import { useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function HomePage() {
  const [hover, setHover] = useState(false);

  return (
    <section
      className="text-center py-20 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/haikei.jpg')" }}
    >
      <div className="card bg-white shadow-lg rounded-lg max-w-sm mx-auto p-6">
        <Image
          src="/inu1.jpg"
          alt="My Photo"
          width={150}
          height={150}
          className={`rounded-full mx-auto mb-4 transform transition-transform duration-500 ${
            hover ? "scale-110 rotate-12" : ""
          }`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <h1 className="text-3xl font-bold mb-2">Kounosuke Kishi</h1>
        <p className="text-lg mb-4">
          Hello, I am aspiring to become a software engineer.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/myprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://twitter.com/myprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://zenn.dev/myprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/zenn-icon.png"
              alt="Zenn Icon"
              width={30}
              height={30}
              className="mx-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
