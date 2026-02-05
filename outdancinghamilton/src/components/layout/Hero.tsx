'use client'
import { FaInstagram } from "react-icons/fa";
import { slideInLeftSlow, slideInUpSoft } from "@/src/lib/animations";
import AnimateOnScroll from "../ui/animations/AnimateOnScroll";
import AnimatedLines from "../ui/AnimatedLines";

export default function Hero() {
    return (
        <>
              {/* Left side */}
<div className="flex flex-row">
 <div className="flex-1 relative p-12 flex flex-col">

  <div
  aria-hidden="true"
  className="pointer-events-none absolute left-0 top-0 h-1/2 w-12 z-10"
  style={{
    background:
      `linear-gradient(45deg, #ed5818 25%, transparent 25%), ` +
      `linear-gradient(-45deg, #ed5818 25%, transparent 25%), ` +
      `linear-gradient(45deg, transparent 75%, #ed5818 75%), ` +
      `linear-gradient(-45deg, transparent 75%, #ed5818 75%)`,
    backgroundSize: "48px 48px",
    backgroundPosition: "0 0, 0 24px, 24px -24px, -24px 0",
    backgroundRepeat: "repeat",
  }}
/>

        {/* Top */}
        <div className="pl-30">
          {/* Left side */}
          <AnimateOnScroll customVariants={slideInLeftSlow}>
        <h1 className="text-8xl font-medium mb-6 tracking-tight leading-tight max-w-lg font-monoton mt-4">
          Out Dancing <br />
          <span className="text-pink-400">Hamilton</span>
        </h1>
        </AnimateOnScroll>
        <AnimateOnScroll
          extraClassName='md:col-span-3'
                  customVariants={{
                    ...slideInUpSoft,
                    visible: {
                      ...slideInUpSoft.visible,
                      transition: {
                        ...slideInUpSoft.visible.transition,
                        delay: 1.5,
                        duration: 1
                      }
                    }
                  }}
                >
        <p className="max-w-md mb-10 text-gray-300 leading-relaxed text-lg font-quicksand">
          <b>Out Dancing Hamilton</b> brings together Hamilton’s dance community, celebrating movement, connection, and fun. Dancing keeps you healthy, lifts your mood, and builds the sense of community we all crave.
        </p>
      </AnimateOnScroll>
        <div className="flex space-x-6 mt-auto text-white text-xl">
          <a href="#" aria-label="Instagram" className="flex hover:text-brand-pink transition">
           <p className="pr-2">Follow us on </p><FaInstagram  className="mt-0.5 text-2xl"/>
          </a>
        </div>   
        </div>     
      </div>

      {/* Right side */}
      
      <div className="flex-1 bg-brand-base relative pl-20 overflow-hidden">
        <AnimatedLines />
       </div>
      </div>
      </>
    )
}