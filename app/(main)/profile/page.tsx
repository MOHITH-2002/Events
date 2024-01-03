
import { Button } from '@/components/ui/button'
import { IOrder } from '@/lib/database/models/order-items-model'
import { SearchParamProps } from '@/types/types'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Collections from '../_components/Collections'
import { getEventsByUser } from '@/lib/actions/event-actions'
import { getOrdersByUser } from '@/lib/actions/order-actions'

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage})

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage })

  return (
    <>
      {/* My Tickets */}
      <section className="pt-20 ">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h1 className='font-bold text-3xl text-center sm:text-left text-orange-700'>My Tickets</h1>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collections
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptySubtext=""
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className='text-3xl font-bold text-center sm:text-left text-orange-700'>Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collections
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptySubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  )
}

export default ProfilePage