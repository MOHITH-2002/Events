"use client"
import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { IEvent } from '@/lib/database/models/event-model';
import { Button } from '@/components/ui/button';
import { checkoutOrder } from '@/lib/actions/order-actions';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const BuyTickets = ({ event, userId }: { event: IEvent, userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId
    }

    await checkoutOrder(order);
  }

  return (
    <form action={onCheckout} method="post">

    <>
      {
          event.isFree ? (
              <Button className="w-full  text-gray-300 bg-blue-600 hover:bg-blue-500"> Book your Free Event Ticket</Button>
              ):(
                  <Button className="w-full text-gray-300 bg-blue-600 hover:bg-blue-500"> Book your Event Ticket for ₹ {event.price}</Button>
                  )
                }
    </>
                </form>
  )
}

export default BuyTickets
