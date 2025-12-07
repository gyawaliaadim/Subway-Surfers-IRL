// TeamIntro.tsx
'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import {useRouter} from "next/navigation";
const teamMembers = [
  { name: "Aadim Gyawali", fileName:"/Aadim.jpg", class: "10", school: "Panini School", role: "Team Leader" },
  { name: "Smile Kalu", fileName:"/Smile.jpg", class: "10", school: "Panini School", role: "Website Developer" },
  { name: "Riwaj Karki", fileName:"/Riwaj.jpg", class: "10", school: "Panini School", role: "Designer" },
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
   <div className="flex flex-col justify-center items-center gap-8">
  <motion.div 
    className="flex justify-center flex-wrap gap-8"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {teamMembers.map((member, i) => (
      <motion.div
        key={i}
        className="bg-yellow-100 rounded-2xl shadow-lg p-8 w-72 text-center flex flex-col items-center"
        variants={cardVariants}
      >
        <div className="bg-gray-300 w-28 h-28 rounded-full mb-6 flex items-center justify-center overflow-hidden">
          <Image
            src={member.fileName}
            alt={member.name}
            width={112}
            height={112}
            className="rounded-full object-cover w-28 h-28"
          />
        </div>
        <h2 className="font-bold text-xl">{member.name}</h2>
        <p className="text-lg">Class {member.class}</p>
        <p className="text-lg">{member.school}</p>
        <p className="italic text-base">{member.role}</p>
      </motion.div>
    ))}
  </motion.div>

  <div
    className="cursor-pointer bg-sky-500 text-white text-3xl font-bold py-5 px-8 rounded-xl hover:bg-sky-600 transition mt-6"
    onClick={() => router.push("/screen2")}
  >
    Continue
  </div>
</div>


  );
}
