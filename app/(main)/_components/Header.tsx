"use client"
import Link from 'next/link'
import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
import {SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/themes/Modetoggle'
import Hamburger from './Hamburger'
import Navitems from './Navitems'



const Header = () => {
    return(
        <div className="flex z-50 w-full top-0 backdrop-blur-md dark:backdrop-blur-sm fixed h-20 items-center justify-between px-3 border-b-[2px] dark:bg-[rgba(0,0,0,.8)] md:px-6 ">
            <div>
                <Logo/>
            </div>
            
            <div className="flex ml-auto gap-x-3">
                <div className="hidden md:flex">

                <Navitems/>
                </div>
                <SignedIn>
                <div className="flex rounded-full items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <UserButton afterSignOutUrl="/" />
                </div>
                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in">
                    <Button variant="ghost" className="border-[2px] dark:text-gray-400 hover:text-blue-600">Login</Button>
                    </Link>
                </SignedOut>
                <div className="hidden md:flex">

                <ModeToggle />
                </div>
                <Hamburger/>
            
            </div>
        </div>
    )
}

export default Header
