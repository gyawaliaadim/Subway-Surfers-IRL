"use client"
import React, { useEffect } from 'react'
import Model from '@/components/Model'
import { useUserData } from '@/context/userData'
import { useRouter } from 'next/navigation'
const Screen6 = () => {
  const router = useRouter()
  const userData = useUserData()
  useEffect(() => {
    userData.setName("")
    userData.setId("")
    userData.setAge("")
  }, [])
  return (
    <Model>
<div className="flex justify-center flex-col items-center gap-6">

    <div className='font-bold text-5xl'>Thank you for playing!</div>
          <button
        className="px-6 py-6 rounded-2xl cursor-pointer hover:bg-yellow-500 bg-yellow-400 text-black font-bold text-2xl disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={()=>router.push("/scoreboard")}
        
      >
       Finish ▶️
      </button>
</div>
    </Model>
  )
}

export default Screen6