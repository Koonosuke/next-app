// components/Github.tsx

export default function GithubStats() {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">📊 My Most Used Languages:</h3>
      <a
        href="https://github.com/anuraghazra/github-readme-stats"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=Koonosuke&layout=compact&theme=radical"
          alt="GitHub Stats"
          className="mx-auto"
        />
      </a>
    </div>
  );
}
