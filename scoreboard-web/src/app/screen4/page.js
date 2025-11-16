"use client"
import React from 'react'
import Model from '@/components/Model'
import { useRouter } from 'next/navigation'
const Screen4 = () => {
    const router = useRouter();
  return (
    <Model>
<div className="flex justify-center flex-col items-center gap-6">

    <div className='font-bold text-4xl'>Waiting for you get your score.</div>
        <div
          className="m-4 cursor-pointer bg-sky-500 text-white text-2xl font-bold py-4 px-6 rounded-xl hover:bg-sky-600 transition"
          onClick={() => router.push("/screen5")}
          >
          Completed
        </div>
            </div>
    </Model>
  )
}

export default Screen4