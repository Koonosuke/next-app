// components/Language.tsx
"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Java",
    "Node.js",
    "React",
    "TypeScript",
    "Vue.js",
    "PHP",
    "Python",
    "Next.js",
  ],
  datasets: [
    {
      label: "Experience in months",
      data: [24, 3, 3, 1, 1, 2, 3, 1],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Programming Skills Experience",
    },
  },
};

const LanguageChart = () => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LanguageChart;
