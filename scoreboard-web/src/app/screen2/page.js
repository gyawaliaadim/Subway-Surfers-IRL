"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
export default function Screen2() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();

  const handleNext = () => {
    localStorage.setItem("playerName", name);
    localStorage.setItem("playerAge", age);
    router.push("/screen3?name=" + encodeURIComponent(name) + "&age=" + encodeURIComponent(age));
  };

  return (
    <Model>

    <div className="container">
      <h2 style={{ fontSize: "2.5rem" }}>Tell us about you 😊</h2>
      <input
        className="input"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="input"
        type="number"
        placeholder="Your Age"
        value={age}
        onChange={e => setAge(e.target.value)}
      />
      <button
        className="button"
        onClick={handleNext}
        disabled={!name || !age}
      >
        Let’s Play ▶️
      </button>
    </div>
    </  Model>
  );
}
