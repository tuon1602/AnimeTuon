"use client"

import React from 'react'
import Icon from "@/public/icon.png"
import Image from "next/image"
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'

export default function testRoute(){
  const session = useSession()
  console.log(session)
    return(
      <div className=' min-h-[80vh] flex items-center justify-center'>

      </div>
   
    )
}