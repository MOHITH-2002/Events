import { Suspense } from "react"
import Footer from "./_components/Footer"
import Header from "./_components/Header"
import Loading from "../loading"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
             <Suspense fallback={<Loading/>}>


      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
             </Suspense>
    </div>
  )
}
