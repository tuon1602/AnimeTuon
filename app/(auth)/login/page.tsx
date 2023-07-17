
import LoginForm from "@/app/components/Auth/LoginForm/LoginForm"
import LoginRegisterImage from "@/public/LoginRegister.jpeg"
import Image from 'next/image'

import React from 'react'

const Login = () => {
  return (
    <div className='min-h-[80vh] flex justify-center'>
        <div className='w-[500px] m-auto h-fit rounded shadow-lg'>
            <div className='w-full h-[250px] relative'>
                      <Image src={LoginRegisterImage} alt="LoginRegister" fill/>
            </div>
            <div className='mt-3'>
                <h1 className='text-center text-2xl '>Login</h1>
                <LoginForm/>
            </div>
        </div>
    </div>
  )
}

export default Login