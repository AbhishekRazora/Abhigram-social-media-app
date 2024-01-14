import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className='h-screen flex flex-row'>
    
    
    <section className='flex flex-1 justify-center items-center flex-col py-10 '>
      
      <Outlet/>
    </section>
    <img src='/assets/images/side-img.svg' alt='logo' className='hidden xl:block  w-1/2 object-cover bg-no-repeat'/>
    </main>
  )
}

export default AuthLayout
