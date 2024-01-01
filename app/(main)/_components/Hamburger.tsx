// "use client";
import { PanelRight } from 'lucide-react'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Logo from './Logo'
import { ModeToggle } from '@/components/themes/Modetoggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Navitems from './Navitems'

const Hamburger = () => {
  return (
   
    <Sheet>
  <SheetTrigger>
    

    <div className=" flex rounded-full items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden">

        <PanelRight className="flex dark:text-gray-400 transition-all " size={30} strokeWidth={1.25} />
        </div>
    


  </SheetTrigger>
    
    
  <SheetContent className="">
        <div className="flex justify-between">

        <Logo/>
        <div className=" flex items-center"> 
        <ModeToggle/>
        </div>
          
        </div>

    <div className='flex  h-[85vh] items-center'>
     <div className='flex flex-col w-full '>
      <Navitems/>
     </div>
     

    
    

    </div>

  </SheetContent>
</Sheet>
  )
}

export default Hamburger
