"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
// import { Button } from '../ui/button'
import { IEvent } from '@/lib/database/models/event-model'
import { Button } from '@/components/ui/button'
import BuyTickets from './BuyTickets'


const Buynow = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <>
      {hasEventFinished ? (
        <p className="p-2 text-red-500">Sorry, tickets are no longer available.</p>
      ): (
        <>
          <SignedOut>
            
              <Link href="/sign-in">
                {
      event.isFree ? (
      <Button className="w-full text-gray-300 bg-blue-600 hover:bg-blue-500"> Book your Free Event Ticket</Button>
      ):(
      <Button className="w-full text-gray-300 bg-blue-600 hover:bg-blue-500"> Book your Event Ticket for ₹ {event.price}</Button>
      )
        }
              </Link>
          </SignedOut>

          <SignedIn>
            <BuyTickets event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </>
  )
}

export default Buynow;
// {
//       event.isFree ? (
//       <Button className="w-full  text-gray-300 bg-blue-600 hover:bg-blue-500"> Book your Free Event Ticket</Button>
//       ):(
//       <Button className="w-full text-gray-300 bg-blue-600 hover:bg-blue-500"> Book your Event Ticket for ₹ {event.price}</Button>
//       )
//     }