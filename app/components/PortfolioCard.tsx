export default function PortfolioCard({
  projectNumber,
}: {
  projectNumber: number;
}) {
  return (
    <div className="card bg-white shadow-md rounded-md p-4">
      <h3 className="font-bold mb-2">Project {projectNumber}</h3>
      <p>Details about project...</p>
    </div>
  );
}
