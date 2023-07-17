"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ImageNotFound from "@/public/404.png"
const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
    <div className="m-auto">
      <div className="flex flex-col gap-2">
        <Image src={ImageNotFound} width={500} height={500} alt="NotFound" />
        <h1 className="text-4xl text-center">404 Not Found</h1>
        <Link href="/" className="text-sm text-center hover:opacity-50">
          Go back to main page
        </Link>
      </div>
    </div>
  </div>
  )
}

export default NotFound