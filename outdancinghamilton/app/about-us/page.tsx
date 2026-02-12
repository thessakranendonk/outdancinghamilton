'use client'
import AnimateOnScroll from "@/src/components/ui/animations/AnimateOnScroll";
import { slideInRightSlow, slowFadeIn } from "@/src/lib/animations";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function AboutUs() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold:0.05
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

    return (
        <div className="my-30 md:flex justify-center mx-auto">
            <div ref={ref} className="max-w-3xl font-quicksand text-base md:text-lg font-medium px-10">
             <motion.div
                   initial="hidden"
                   animate={controls}
                   className="space-y-4"
                   variants={slowFadeIn}
                 >
            <h1 className="font-bungee text-center text-4xl md:text-5xl text-brand-pink text-shadow-lg my-10">About Us</h1>
                       
            <p>Out Dancing Hamilton is a community-driven list of dance events happening around Hamilton, for both solo dancers and partners. Every event you see here has a confirmed date and is added with care once it’s known.</p>

            <p>If you’re organizing an event or know of one that’s missing, I’d love for you to share it! Please <Link href="/submit-event" className="text-brand-pink hover:text-brand-pop underline underline-offset-2">submit the event</Link> through the event submission form so it can be reviewed and added for others to discover.</p>
        
            <p>Out Dancing Hamilton also lives on Instagram at <Link href="https://www.instagram.com/outdancinghamilton/?hl=en" target="_blank" className="text-brand-pink hover:text-brand-pop underline underline-offset-2">@outdancinghamilton</Link>: Each event gets a single post once there’s an Instagram-friendly image or video and enough detail to share. The event listing on this site links directly to that post.
            On days when something’s happening, there’s a Story (usually posted early in the morning) highlighting that day’s events and linking back to the website for details. Every Monday, there’s a post and a Story rounding up all the events for the week.</p>

            <p>This site is created and maintained by Rohan Jayasekera (@RohanSJ on Instagram). He genuinely loves going out dancing in Hamilton—something even <Link href="https://www.cbc.ca/news/canada/hamilton/rohan-jayasekera-dancer-1.7089176" target="_blank" className="text-brand-pink hover:text-brand-pop underline underline-offset-2">CBC News</Link> has noticed. He started Out Dancing Hamilton because he needed a resource like this himself, couldn’t find one, and discovered that plenty of other people wanted it too.

            Dancing is good for you. It keeps you physically active, supports mental health, and just plain feels good. Rohan’s doctor is very happy about how much he dances… even if they’re a little less thrilled that he’ll do it in dress shoes.</p>
           <div className='lg:hidden md:col-span-3'>
        <img className="w-50 h-50 mx-auto md:w-120 md:h-120 md:mt-10 md:mb-15 xl:mt-40 xl:ml-10 object-cover rounded-full shadow-lg border-8 border-brand-pink" alt="Rohan" src="/images/rohan.jpg" />
        </div>
            <p>If you have any questions or would like to contant us, please DM us on <Link href="https://www.instagram.com/outdancinghamilton/?hl=en" target="_blank" className="text-brand-pink hover:text-brand-pop underline underline-offset-2">@outdancinghamilton</Link> or email us at <a href="mailto:info@outdancinghamilton.com" className="text-brand-pink hover:text-brand-pop underline underline-offset-2">info@outdancinghamilton.com</a>
          </p>
            </motion.div>
        
        </div>
        <AnimateOnScroll
          extraClassName='hidden lg:inline-block md:col-span-3'
                  customVariants={{
                    ...slideInRightSlow,
                    visible: {
                      ...slideInRightSlow.visible,
                      transition: {
                        ...slideInRightSlow.visible.transition,
                        delay: 2.5,
                        duration: 1
                      }
                    }
                  }}
                >
        <img className="lg:w-120 lg:h-120 lg:mt-25 xl:mt-40 xl:ml-10 object-cover rounded-full shadow-lg border-8 border-brand-pink" alt="Rohan" src="/images/rohan.jpg" />
        </AnimateOnScroll>
        </div>
    )
}