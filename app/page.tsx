"use client";
import Image from "next/image";
import { useState } from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function HomePage() {
  const [hover, setHover] = useState(false);

  return (
    <section
      className="text-center flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('/haikei.jpg')" }}
    >
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-2xl p-10 backdrop-blur-sm bg-opacity-90">
        <Image
          src="/inu1.jpg"
          alt="My Photo"
          width={180}
          height={180}
          className={`rounded-full mx-auto mb-6 transform transition-transform duration-500 ${
            hover ? "scale-110 rotate-6" : ""
          }`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <h1 className="text-4xl font-bold mb-3">Kounosuke Kishi</h1>
        <p className="text-lg mb-6">
          大学で情報系を学びながら、Web開発・IoT・クラウド（特にAWS）など幅広い分野に挑戦しています。
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Koonosuke"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition"
          >
            <FaGithub size={32} />
          </a>
          <a
            href="https://x.com/konosukebackend?s=11&t=h7d9sZn8ccPWL7nnhrrzUw"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-600 transition"
          >
            <FaTwitter size={32} />
          </a>
          <a
            href="https://zenn.dev/koounosuke"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/zenn-icon.png"
              alt="Zenn Icon"
              width={32}
              height={32}
              className="mx-auto"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
