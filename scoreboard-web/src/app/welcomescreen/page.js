// Example: app/page.tsx (Welcome screen)
"use client";

import { useRouter } from "next/navigation";
import Model from "@/components/Model";
export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <Model>

    <div>

      <div className="text-3xl font-bold mb-6">Welcome to

        <p className="text-5xl"> Subway Surfers IRL!</p></div>
      <div
        className="cursor-pointer bg-sky-500 text-white text-2xl font-bold py-4 px-6 rounded-xl hover:bg-sky-600 transition"
        onClick={() => router.push("/screen1")}
      >
        Continue 🎉
      </div>
    </div>
    </Model>

  );
}
