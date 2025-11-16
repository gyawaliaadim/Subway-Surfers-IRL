"use client";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import axios from "axios";
import { useUserData } from "@/context/userData";
export default function Screen3() {
  const router = useRouter();
  const userData = useUserData();

  return (
    <Model>
      <div className="container">
        <h2 style={{ fontSize: "2.5rem" }}>Great! Ready to start?</h2>
        <p style={{ fontSize: "1.4rem", marginTop: "1rem" }}>
          Start Playing {userData.name?.split(" ")[0]} 🚀
        </p>

        <div
          className="m-4 cursor-pointer bg-sky-500 text-white text-2xl font-bold py-4 px-6 rounded-xl hover:bg-sky-600 transition"
          onClick={() => router.push("/screen4")}
        >
          Start the game
        </div>

      </div>
    </Model>
  );
}
