"use client";
import React from 'react'
import Image from 'next/image';
import path from 'path';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

const menuOptions = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'Pricing',
        path: '/pricing'
    },
    {
        name: 'Contact Us',
        path: '/contact'
    } ]

const Header = () => {
const {user} = useUser();

  return (
    <div className='flex justify-between items-center p-4'>
      {/*logo*/}
      <div className='flex gap-2 items-center'>
      <Image src={'/logo.svg'} alt='logo' width={30} height={30}/>
      <h2 className='font-bold'>AI Trip Planner</h2>
      </div>
      {/*Menu options*/}
      <div className='flex gap-8 items-center'>
        {menuOptions.map((menu, index) => (
            <Link href={menu.path}>
                <h2 className='text-lg hover:scale-105 transition'>{menu.name}</h2>
            </Link>
        ))}
      </div>
      {!user? <SignInButton mode='modal'>
      <Button className='bg-blue-800 text-white hover:bg-blue-500 transition'>Get Started</Button>
      </SignInButton>:
      <Link href='/create-new-trip'>
      <Button className='cursor-pointer'>Create New Trip</Button>
      </Link>}
    </div>
  )
}

export default Header
