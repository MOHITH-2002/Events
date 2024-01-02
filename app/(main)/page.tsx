import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <section className="flex py-20">

   <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2">
    <div className="flex flex-col justify-center gap-8">
    <h1 className="font-bold text-justify text-3xl md:text-5xl">Use Our Platform to Host, Connect, and Celebrate Your Events!</h1>
     <p className="text-xl text-justify">Get a book and gain useful advice from mentors in prestigious firms with our international community.</p>
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
    <section>
      <span>
        hello
      </span>
      <span>
        hello
      </span>
      <span>
        hello
      </span>
    </section>
    </>
  )
}

