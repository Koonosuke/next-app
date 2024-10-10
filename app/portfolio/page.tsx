// portfolio/page.tsx
import PortfolioCard from "../components/PortfolioCard";

export default function PortfolioPage() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(10)].map((_, index) => (
          <PortfolioCard key={index} projectNumber={index + 1} />
        ))}
      </div>
    </section>
  );
}
