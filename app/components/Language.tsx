"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// Chart.jsのプラグイン登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ✅ カスタムフックで画面幅取得
const useWindowWidth = () => {
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize(); // 初回実行
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

// グラフオプション（横向き・レスポンシブ）
const chartOptions = (title: string) => ({
  indexAxis: "y" as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: title,
      font: { size: 18 },
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) => `Skill Level: ${context.raw}`,
      },
    },
  },
  scales: {
    x: {
      min: 0,
      max: 10,
      ticks: { stepSize: 1 },
    },
  },
});

// カスタムカラー
const barColors = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
];

// プログラミングスキル
const programmingData = {
  labels: [
    "Java",
    "Node.js",
    "React",
    "TypeScript",
    "Vue.js",
    "PHP",
    "Python",
    "Next.js",
    "Go",
  ],
  datasets: [
    {
      data: [8, 6, 7, 6, 2, 2, 5, 7, 6],
      backgroundColor: barColors,
      borderRadius: 4,
    },
  ],
};

// インフラスキル
const infraSkills = [
  "AWS",
  "EC2",
  "S3",
  "DynamoDB",
  "Lambda",
  "IAM",
  "VPC",
  "CloudWatch",
  "AWS IoT",
  "API Gateway",
  "Timestream",
  "Grafana",
  "Firebase",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "GitHub Actions",
];

// バッジ表示
const SkillBadges = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-wrap gap-3 mt-4">
    {skills.map((skill, idx) => (
      <span
        key={idx}
        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow"
      >
        {skill}
      </span>
    ))}
  </div>
);

// メインコンポーネント
const LanguageChart = () => {
  const width = useWindowWidth();

  return (
    <div className="space-y-12 px-4 max-w-4xl mx-auto py-10">
      <div
        className="bg-white shadow-md rounded-md p-6"
        style={{ height: width && width < 640 ? "450px" : "300px" }}
      >
        <Bar
          data={programmingData}
          options={chartOptions("Programming Skills (10-point scale)")}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          その他触ったことのある技術
        </h2>
        <p className="text-sm text-gray-600">
          実務や個人開発などで使用したことのあるクラウド、データベース、CI/CDツールなどです。
        </p>
        <SkillBadges skills={infraSkills} />
      </div>
    </div>
  );
};

export default LanguageChart;
