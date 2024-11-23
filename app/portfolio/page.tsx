// portfolio/page.tsx
import { Suspense } from "react";
import PortfolioCard from "../components/PortfolioCard";

export default function PortfolioPage() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-4">
        Portfolio→画像をタップして詳細へ
      </h2>
      <Suspense>
        <PortfolioCard />
      </Suspense>
    </section>
  );
}
