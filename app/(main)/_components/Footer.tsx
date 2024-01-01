import React from 'react'
import Logo from './Logo'
import { Button } from '@/components/ui/button';

const Footer = () => {
  const date = new Date();
  return (
    <footer className="border-t-[2px] dark:bg-[rgba(0,0,0,.8)]">
      <div className="mt-5 mb-5 flex flex-col space-y-3 items-center justify-between  w-full  px-3 md:px-6 md:flex-row">

      <div className="flex">
        <Logo/>
      </div>
      <div>
        <Button variant="ghost" className=" hover:text-blue-600 text-[17px]">Terms & Conditions</Button>
      </div>
      <div className="">
        
        <span>© {date.getFullYear()} Events. All rights reserved.</span>
      </div>
      </div>
    </footer>
  )
}

export default Footer;
