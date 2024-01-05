import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import Collections from './_components/Collections'
import { getAllEvents } from '@/lib/actions/event-actions'
import Search from './_components/search'

export default async function Home() {
  const allEvents = await getAllEvents({
    query:'',
    category:'',
    page:1,
    limit:6
  })
  
  return (
    <>
    <section className="flex py-20">

   <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2">
    <div className="flex flex-col justify-center gap-8">
    <h1 className="font-bold text-3xl md:text-5xl">Use Our Platform to Host, Connect, and Celebrate Your Events!</h1>
     <p className="text-xl ">Get a book and gain useful advice from mentors in prestigious firms with our international community.</p>
     <Button size="lg" asChild className="w-full sm:w-fit">
              <Link href="/events/create">
                Explore Now
              </Link>
            </Button>
    </div>
     <Image 
            src="/illustration-white.svg"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
    </div>
    </section>
   
    <div className='wrapper'>
      <h1 className='font-bold text-3xl text-orange-800 pb-5 text-center'> Recent Events</h1>
      <Collections 
      data={allEvents?.data}
      emptyTitle="Not found"
      emptySubtext="come back later"
      collectionType="All_Events"
      urlParamName=''
      limit={6}
      page={1}
      totalPages={2}
      />
    </div>
    </>
  )
}

