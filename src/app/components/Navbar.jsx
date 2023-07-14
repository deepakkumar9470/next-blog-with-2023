"use client"
import React,{useState,useContext} from 'react'
import Link from 'next/link'
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import {signIn,signOut,useSession} from 'next-auth/react'

const Navbar = () => {
  const {data:session} = useSession()
  // const {user} = useContext(UserContext)

  const [openMenu,setOpenMenu] = useState(false)
  const visibleHandler = () =>{
    setOpenMenu((prev)=> !prev)
  }
  return (
    <header className='w-full  cursor-pointer bg-gray-600 text-white p-3 z-50  flex justify-between items-center mx-auto px-10'>

       <div>
        <Link href="/" className='text-2xl font-bold'>
           <h1>Blog App</h1>
        </Link>
       </div>

       <div className='lg:hidden z-50'>
        {
          openMenu ? 
          (<AiOutlineClose className='w-6 h-6' onClick={visibleHandler}/>)
          :
          (<AiOutlineMenu className='w-6 h-6' onClick={visibleHandler}/>)
        }

       </div>

       <nav className={` ${openMenu? "right-0" : "right-full"} transition-all duration-300 mt-[56px lg:mt-0] bg-primary lg:bg-transparent flex flex-col w-full lg:w-auto lg:flex-row justify-center lg:justify-end fixed top-0 bottom-0 -right-full lg:static flex gap-x-9 items-center`}>
          
          {
        session ?.user 
        ? 
        (<>
        <ul className={`flex  flex-col z-50 lg:flex-row items-center gap-5 gap-x-2 ${openMenu ? "text-blue-600" : "text-white"}`}>
            <li>
            <Link href="/">
              Home
            </Link>
            </li>
            <li>
            <Link href="/about">
              About
            </Link>
            </li>
            <li>
            <Link href="/contact">
              Contact
            </Link>
            </li>
          </ul>
            <Link href="/post" className='px-6 py-2.5 rounded-md bg-blue-600 mt-3 text-white'>
               Create Post
            </Link>
            <button className='px-6 py-2.5 rounded-md bg-gray-800 mt-3 text-white'
            onClick={()=>signOut()}>
              Logout
            </button>
         </>)
        :
        (
          <>
             <Link href="/login" className='px-6 py-2.5 rounded-md bg-blue-500 mt-3 text-white'>
               Login
             </Link>
             <Link href="/register" className='px-6 py-2.5 rounded-md bg-blue-500 mt-3 text-white'>
               SignUp
             </Link>
          </>
        )
       }
       </nav>

      
        
    </header>
  )
}

export default Navbar