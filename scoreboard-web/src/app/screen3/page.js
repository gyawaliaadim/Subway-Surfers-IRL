"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Model from "@/components/Model";

export default function Screen3() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams?.get("name");

  return (
    <Model>
      <div className="container">
        <h2 style={{ fontSize: "2.5rem" }}>Great! Ready to start?</h2>
        <p style={{ fontSize: "1.4rem", marginTop: "1rem" }}>
          Lets go {name?.split(" ")[0]} 🚀
        </p>

        <div
          className="m-4 cursor-pointer bg-sky-500 text-white text-2xl font-bold py-4 px-6 rounded-xl hover:bg-sky-600 transition"
          onClick={() => router.push("/screen2")}
        >
          Continue
        </div>

      </div>
    </Model>
  );
}
