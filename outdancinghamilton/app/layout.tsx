'use client'
import clsx from "clsx";
import Footer from "../src/components/layout/Footer";
import Header from "../src/components/layout/Header";
import "./globals.css";
import { usePathname } from 'next/navigation'
import { NavigationLinkProps } from "@/types/component-types";


export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navigationLinks: Array<NavigationLinkProps> = [
    { name: "Upcoming Events", href: "/#upcoming-events" },
    { name: "Submit Your Event", href: "/submit-event" },
    { name: "About Us", href: "/about-us" },
  ];

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
       <Header 
         navigationLinks={navigationLinks}
         currentActiveLocation={pathname}
         textClassName="group text-lg transition-all duration-300 ease-in-out font-light mx-8 text-white"
         linkClassName="flex bg-left-bottom text-md font-quicksand"
         logoClassName="w-20 md:w-26 md:h-26 align-top mt-5 left-6 md:left-0"
         hoverClassName={clsx(
           "flex hover:font-semibold hover:text-brand-pink transition-all duration-500 ease-out"
         )}
         activeLinkClassName="text-brand-pop font-medium text-md"
    />
        <main className="flex-1">{children}</main>
       <Footer navigationLinks={navigationLinks} />
    </body>
    </html>
  );
};