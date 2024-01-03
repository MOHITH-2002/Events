import { Button } from '@/components/ui/button'
import { IEvent } from '@/lib/database/models/event-model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirm'
type cardProps={
    event:IEvent,
    hidePrice?:boolean,
    hasOrderLink?:boolean
}
const Card = ({hidePrice,hasOrderLink,event}:cardProps) => {

   // Get current date and time
  const currentDate = new Date();

  // Check if the event is live or offline

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const eventStarted = new Date(event.startDateTime) > new Date();

    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId as string;
      const isEventCreator = userId === event.organizer._id.toString();

  return (
     <div className="relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl md:min-h-[438px] dark:border-2 dark:border-gray-500">
      <Link 
        href={`/events/${event._id}`}
        style={{backgroundImage: `url(${event.imageUrl})`}}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      

      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      > 
        {/* IS EVENT CREATOR ... */}

      {isEventCreator && !hidePrice && (
        <>
        
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-gray-400  p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image src="/edit.svg" alt="edit" width={20} height={20} />
            
        </Link>

          <DeleteConfirmation eventId={event._id}/>
          
        </div>
          <div className="absolute left-2 top-2 flex flex-col gap-4 p-1 rounded-sm bg-transparent shadow-sm transition-all">
  
  
   {
   hasEventFinished ? (
        <p className="font-bold text-red-500">Closed</p>
      ): (
        eventStarted ? (<p className="font-bold text-green-600">upcoming</p>):(
        <p className="font-bold text-red-500">live
          
        </p>)
      )
  }
</div>
        </>
      )}
        <Link href={`/events/${event._id}`}>
          <p className="font-bold text-2xl">{event.title}</p>
        </Link>
       {!hidePrice && <div className="flex gap-2">
          
          <Button variant='outline' className="bg-[#FB8B24]/10 hover:bg-orange-800/10 rounded-xl ">{event.isFree ? 'Free' : `₹ ${event.price}`}</Button>
          <Button variant='outline' className=" rounded-xl">
            {event.category.name.length > 10
    ? `${event.category.name.substring(0, 10)}...`
    : event.category.name}
            </Button>
        </div>}

        <p className="p-medium-16 p-medium-18 text-grey-500 text-blue-600">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        

        <div className="flex-between w-full">
            
          <p className="text-green-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              {/* <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} /> */}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
