// Timeline.tsx
import Link from "next/link";

export default function Timeline() {
  const experiences = [
    {
      title: "株式会社GenAi　エンジニアアルバイト",
      position: "アルバイト",
      startDate: "2024年11月",
      endDate: "現在",
      description: "",
      link: "https://genai.co.jp",
    },
    {
      title: "サポーターズハッカソン",
      position:
        "個人開発共有サイト　使用技術：Next.js/React/TyprScript/TailwindCSS",
      startDate: "2024年9月28日",
      endDate: "2024年9月29日",
      description: "インターンで仲良くなった友人と",
      link: "https://dev-share-phi.vercel.app",
    },
    {
      title: "株式会社エムティーアイ　7daysインターン優勝",
      position: "チームリーダー経験",
      startDate: "2024年8月19日",
      endDate: "2024年8月26日",
      description: "使用技術:Node.js/Vue.js/AWS(Lambda,CloudWatch,DynamoDB)",
      link: "",
    },
    {
      title: "サポーターズハッカソン",
      position: "家計簿アプリ:Node.js/HTML/CSS",
      startDate: "2024年6月22日",
      endDate: "2024年6月23日",
      description: "大学の友人と",
      link: "",
    },
    {
      title: "株式会社ラクーンホールディングス　エンジニアアルバイト",
      position: "アルバイト",
      startDate: "2024年2月",
      endDate: "2024年6月",
      description: "売上保証サービス（SpringBootコード修正）",
      link: "",
    },
  ];

  return (
    <div className="timeline relative border-l border-gray-300 pl-6">
      {experiences.map((exp, index) => (
        <div key={index} className="timeline-item mb-8">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full -ml-1.5 mr-4"></div>
            <h3 className="text-xl font-semibold">
              <Link href={exp.link} legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700"
                >
                  {exp.title}
                </a>
              </Link>
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-1">
            {exp.position} | {exp.startDate} - {exp.endDate}
          </p>
          <p className="text-base text-gray-700">{exp.description}</p>
        </div>
      ))}
    </div>
  );
}
