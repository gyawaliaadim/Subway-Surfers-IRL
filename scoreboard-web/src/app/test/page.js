"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Model from "@/components/Model";
import axios from "axios";
import {v4 as uuidv4} from 'uuid'
import { useUserData } from "@/context/userData";
export default function Screen2() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const userData = useUserData();
  

const validate = (n, a) => {
  if (
    a &&
    n &&
    a > 0 &&
    a < 120 &&
    n.length > 3 &&
    n.split(" ").length < 4 &&
    n.split(" ").length >= 2
  ) {
    setError("");
    return true;
  } else {
    setError("Please enter valid name and age");
    return false;
  }
};

 const onSubmit = async () => {
  let trimmedName = name.trim();
  let validName = trimmedName
    .split(" ")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");

  const ageNum = Number(age);
  const validated = validate(validName, ageNum);
  if (!validated) return;

  setName(validName);
  
  try {
    // console.log(id, validName, ageNum);
    const res = await axios.post('/api/userData', { name: validName, age: ageNum });
    if (res.status === 200) {

      userData.setName(validName);
      userData.setAge(ageNum);
      userData.setId(res.data.id);
      router.push("/screen3");
    }
  } catch {
    setError("Failed to submit data. Please try again.");
  }
};

  
    return (
    <Model>

    <div className="flex justify-center flex-col items-center gap-6">
      <h2 style={{ fontSize: "2.5rem" }}>Tell us about you 😊</h2>
      
      <div 
      onClick={()=>console.log("take photo")}
      className="p-10 cursor-pointer hover:bg-gray-600 duration-300 transition-all rounded-full bg-gray-400 w-min h-min text-3xl">
        📷
      </div>
      
      <div>

      <input
        className="input"
        type="text"
        placeholder="Your full Name (eg Ram Kumar)"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="input"
        type="number"
        placeholder="Your Age (eg 20)"
        value={age}
        onChange={e => setAge(e.target.value.trim())}
        />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      <button
        className="px-6 py-6 rounded-2xl hover:bg-yellow-500 cursor-pointer bg-yellow-400 text-black font-bold text-2xl disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={()=>onSubmit()}
        disabled={!name || !age}
      >
        Let's Play ▶️
      </button>
    </div>
    </  Model>
  );
}
