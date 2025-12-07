"use client"
import React from 'react'
import Model from '@/components/Model'
import axios from 'axios'
import { useUserData } from '@/context/userData'
import { useRouter } from 'next/navigation'
const Screen5 = () => {
    const [score, setScore] = React.useState("")
    const [error, setError] = React.useState("")
    const userData = useUserData();
    const router = useRouter();
    const onSubmit = async () => {
        try{
            let validScore = score.trim();
            validScore = Number(validScore);
            if(isNaN(validScore) || validScore < 0){
                setError("Please enter a valid score");
                return;
            }
            await axios.put('/api/userData', { id: userData.id, score: validScore })
            .then(res => {
                if (res.status === 200) {
                  router.push("/thankyou")
                }
            }).catch(err => {
                console.error(err);
                alert("An error occurred while submitting your score. Please try again.");
            });
        }
        catch(err){
            console.error(err);
            alert("An error occurred while submitting your score. Please try again.");
        }
    }
  return (
    <Model>

    <div className="flex justify-center flex-col items-center gap-6">
      <h2 style={{ fontSize: "2.5rem" }}>How much did you score {userData.name.split(" ")[0]}?</h2>
      
      <div>

      <input
        className="input"
        type="number"
        placeholder="Your Score"
        value={score}
        onChange={e => setScore(e.target.value)}
      />
     
        </div>
        {error && <p className="text-red-500">{error}</p>}

      <button
        className="px-6 py-6 rounded-2xl cursor-pointer bg-yellow-400 text-black font-bold text-2xl disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={()=>onSubmit()}
        disabled={!score}
      >
       Finish ▶️
      </button>
    </div>
    </Model>
  )
}

export default Screen5