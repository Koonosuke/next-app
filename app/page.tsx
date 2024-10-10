// home/page.tsx
import Image from "next/image";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function HomePage() {
  return (
    <section className="text-center py-10">
      <Image
        src="/inu1.jpg"
        alt="My Photo"
        width={150}
        height={150}
        className="rounded-full mx-auto"
      />

      <h1 className="text-3xl font-bold my-4">Kounosuke Kishi</h1>
      <p className="text-lg">
        Hello, I am aspiring to become a software engineer.
      </p>
      <div className="flex justify-center space-x-4 mt-6">
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
      </div>
    </section>
  );
}
