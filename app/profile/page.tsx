import React from 'react'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const ProfilePage = async  () => {
    const session = await getServerSession(options)
    if(!session){
        redirect("/login")
    }
  return (
    <div className='min-h-[80vh]'>
        wtf
    </div>
  )
}

export default ProfilePage