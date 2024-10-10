// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{tsx,ts,jsx,js}", "./components/**/*.{tsx,ts,jsx,js}"],

  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
