import { Button } from '@/components/ui/button';
import { getEventbyId, getRelatedEvents } from '@/lib/actions/event-actions'
import { SearchParamProps } from '@/types/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Collections from '../../_components/Collections';
import Buynow from '../_components/Buynow';

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const EventidPage = async({ params: { id }, searchParams }: SearchParamProps) => {
  const event = await getEventbyId(id);
   
  const formattedStartDate = formatDate(event.startDateTime);
  const formattedEndDate = formatDate(event.endDateTime);

  const relatedEvents = await getRelatedEvents({
    categoryId: event.category._id,
    eventId: event._id,
    page:searchParams.page as string,
  })
  
  return (
    <div className="wrapper">
      <section className="pt-20 pb-5">

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:max-w-7xl">
        <Image className='h-full max-h-[500px] object-cover object-center border-2 rounded-md' src={event.imageUrl} height={500} width={500} alt="img"/>
        <div className="flex flex-col gap-8">
          <h1 className="font-bold text-2xl">{event.title}</h1>
          <div className="flex gap-x-5">
            {
              event.isFree ? (<Button variant='outline' className="bg-[#FB8B24]/10 hover:bg-orange-800/10 rounded-2xl">Free</Button>)
              :
              (<Button variant='outline' className="bg-[#FB8B24]/10 hover:bg-orange-800/10 rounded-2xl">₹ {event.price}</Button>)
            }
            
            
              <Button variant='outline' className=" rounded-2xl">{event.category.name}</Button>
          </div>
          <div className="flex gap-2">
            <Image src="/calender.svg" alt="calender" width={40} height={40}/>
            <div className="flex flex-col gap-2">

            <span>
                From : 
            <span className="text-blue-600"> {formattedStartDate}</span>
            </span>
            <span>
                To : 
            <span className="text-blue-600"> {formattedEndDate}</span>
            </span>
            </div>
          </div>
          <span>Hosted by : <span className="font-bold text-green-600 ">{event.organizer.firstName}{event.organizer.lastName}</span></span>
          { event.location === "online" ?
          (
          <span>Location : <Link href={event.url}><Button variant="outline">view website</Button></Link></span>): 
           
           ( <span>Location : <span className="font-bold text-red-500 ">{event.location}</span></span>)
          }
          <h1 className="text-gray-600 font-bold text-2xl underline">Event Details :-</h1>
          <p>{event.description}</p>
          <div className="flex gap-2">
          <Image src="/url.svg" className="" width={20} height={20} alt="location"/>

          <Link href={event.url} className="text-blue-500">{event.url}</Link>
          </div>
</div>
      </div>
      </section>

      <div className="sticky bottom-0 md:relative">
        
          <Buynow event={event}/>
      </div>

      <section className="flex pt-5 flex-col">
        <h1 className="text-orange-700 font-bold text-3xl">Related Events</h1>
        <Collections 
      data={relatedEvents?.data}
      emptyTitle="Not found"
      emptySubtext="come back later"
      collectionType="All_Events"
      urlParamName=''
      limit={6}
      page={1}
      totalPages={2}
      />
      </section>
    </div>
  )
}

export default EventidPage
