// about/page.tsx
import LanguageChart from "../components/Language";
import Timeline from "../components/Timeline";

export default function AboutPage() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <Timeline />
      <div className="mt-10">
        <LanguageChart />
      </div>
    </section>
  );
}
