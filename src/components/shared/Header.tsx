import React from 'react'
import { FloatingNav } from '../ui/NavBar'
import Link from 'next/link'
import AuthButton from './AuthButton'
import { auth } from '@/auth'

export const navItem = [
  {
  name: "home",
  link:"/",
},
{
  name: "browse",
  link:"/browse",
  },
  {
    name: "post",
    link:"/post-video",
    },
]

async function Header() {
  const session = await auth()

  console.log(session?.user.id)
  return (
    <header className=' relative flex justify-between items-center font-semibold w-screen p-4 px-6 blur-0 border-b border-white/10 text-white z-20'>
      <div className='grid place-content-center text-3xl'>
        eLio
      </div>
      <div className='flex gap-4'>
        {
          navItem.map((data) => (
            <Link href={data.link}
              className=' p-2 capitalize hover:text-blue-500'
              key={data.name}
            >
              {data.name}
            </Link>
          ))
        }
      </div>
      <div>
        <AuthButton
          userId={session?.user.id}
          userImage={session?.user.image}
        />
      </div>
    </header>
  )
}

export default Header