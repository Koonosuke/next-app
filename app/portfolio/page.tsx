// portfolio/page.tsx
import PortfolioCard from "../components/PortfolioCard";

export default function PortfolioPage() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
      <PortfolioCard />
    </section>
  );
}
