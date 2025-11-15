// TeamIntro.tsx
'use client';

import { motion } from "framer-motion";
import {useRouter} from "next/navigation";
const teamMembers = [
  { name: "Aadim Gyawali", class: "10", school: "Panini School", role: "Team Leader" },
  { name: "Smile Kalu", class: "10", school: "Panini School", role: "Strategist" },
  { name: "Anmol Prasai", class: "8", school: "Panini School", role: "Researcher" },
  { name: "Riwaj Karki", class: "10", school: "Panini School", role: "Designer" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10 } },
};

export default function TeamIntro() {
    const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center ">
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {teamMembers.map((member, i) => (
        <motion.div
          key={i}
          className="bg-yellow-100 rounded-2xl shadow-lg p-6 w-64 text-center flex flex-col items-center"
          variants={cardVariants}
        >
          {/* Placeholder for picture */}
          <div className="bg-gray-300 w-24 h-24 rounded-full mb-4 flex items-center justify-center">
            <span className="text-gray-600">Pic</span>
          </div>
          <h2 className="font-bold text-lg">{member.name}</h2>
          <p>Class {member.class}</p>
          <p>{member.school}</p>
          <p className="italic text-sm">{member.role}</p>
        </motion.div>
      ))}
            
    </motion.div>
    <div
        className="m-4 cursor-pointer bg-sky-500 text-white text-2xl font-bold py-4 px-6 rounded-xl hover:bg-sky-600 transition"
        onClick={() => router.push("/screen2")}
      >
        Continue
      </div>
      </div>
  );
}
