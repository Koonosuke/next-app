// layout.tsx
import { ReactNode } from "react";
import Header from "../app/components/Header";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <Header />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
