import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navitems = () => {
    const pathname=usePathname()

  return (
  <section className={cn("flex flex-col md:flex-row")}>
    <Link href="/">
    <Button variant="ghost" className={cn("text-[1rem] dark:text-gray-400 hover:text-blue-600",pathname==="/" && "text-blue-600 dark:text-blue-600")}>Home</Button>
    </Link>
    <Link href="/contact">
    <Button variant="ghost" className={cn("text-[1rem] dark:text-gray-400 hover:text-blue-600",pathname==="/contact" && "text-blue-600 dark:text-blue-600")}>Contact</Button>
    </Link>
    <Link href="/events/create">
    <Button variant="ghost" className={cn("text-[1rem] dark:text-gray-400 hover:text-blue-600",pathname==="/events/create" && "text-blue-600 dark:text-blue-600")}>Events</Button>
    </Link>

  </section>
  );
};

export default Navitems;
