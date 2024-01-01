import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"
import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="wrapper h-screen ">
        
            <div className="mb-10 ">
                <Link href="/" className="">
                    <div className="flex rounded-full items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">

                        <MoveLeft className="flexdark:text-gray-400 transition-all" size={30} strokeWidth={1.25}/>
                    </div>
                </Link>
            </div>
        
      <div className="flex items-center justify-center">

      <main className="">{children}</main>
      </div>
      
    </div>
  )
}
