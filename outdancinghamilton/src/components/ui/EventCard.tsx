'use client'
import { fadeIn, slideInUpSoft } from "@/src/lib/animations";
import AnimateOnScroll from "./animations/AnimateOnScroll";
import { DashboardEventListProps } from "./DashboardEventList";
import { OutDancingLink } from "./OutDancingLink";
import discoball from "@/public/images/discoball.jpg"
import Image from "next/image";
import DateCard from "./DateCard";
import { FaLocationDot } from "react-icons/fa6";

export default function EventCard({
  events,
  heading,
  approveAction,
  rejectAction,
  openEditModal,
  openPopupModal
}: DashboardEventListProps) {
    return (
        <div>
        <AnimateOnScroll customVariants={fadeIn}>
      <h2 className="text-6xl font-semibold mb-2 pt-8 pb-20 font-[Bungee] text-shadow-lg text-brand-pink text-center">{heading}</h2>
      </AnimateOnScroll>
            <ul className="mx-auto max-w-5xl justify-center space-y-6 font-quicksand">
        {events.map((ev) => (
          <li key={ev.id}>
            <AnimateOnScroll customVariants={slideInUpSoft}>
              <div className="grid grid-row-2 grid-cols-4 w-full bg-white/80 text-brand-base/80 rounded-lg shadow-xl">
                <div>
                  {ev.imgUrl ? 
                    <img 
                    className="h-85 w-65 object-cover rounded-l-lg"
                    alt={ev.eventName} src={ev.imgUrl}/> :
                    <Image 
                    className="h-85 w-65  object-cover shadow-lg rounded-l-lg"
                    alt={ev.eventName} src={discoball}/>
                  }
                </div>

                <div className="col-span-2 mt-10 ml-10 text-xl space-y-3">
                  <p className="font-bungee text-brand-pink text-4xl text-shadow-md">{ev.eventName}</p>
                  <p className="text-xl font-bold text-shadow-md">{ev.description}</p>
                  {/* {ev.price !== "Free" ? <p>${ev.price}</p> : <p>{ev.price}</p>} */}
                  <p className="flex"><FaLocationDot className="mt-1 mr-2"/> {ev.location}</p>
                  <p>
                   {ev.date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })} - {ev.date.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  {ev.age && <p>{ev.age}</p>}
                  {ev.price !== "Free" ? <p className="font-bungee text-yellow-500 text-shadow-sm text-shadow-brand-pop text-4xl pt-2">${ev.price}</p> : 
                  <p className="font-bungee text-yellow-500 text-shadow-sm text-shadow-brand-pop text-4xl pt-2">{ev.price}</p>}

                </div>

                <div className="flex flex-col justify-between mb-10">
                    <DateCard date={ev.date} />

                  {/* ONLY VISIBLE FOR ADMIN */}
                  <div className="">
                  {rejectAction && (
                    <form action={rejectAction}>
                      <input type="hidden" name="id" value={ev.id} />
                      <button>Reject</button>
                    </form>
                  )}

                  {openPopupModal &&
                    <button
                      onClick={() => openPopupModal(ev)}
                    >
                      Delete
                    </button>
                  }

                  {approveAction && (
                    <form action={approveAction}>
                      <input type="hidden" name="id" value={ev.id} />
                      <button>Approve</button>
                    </form>
                  )}

                  {openEditModal &&
                    <button
                      onClick={() => openEditModal(ev)}
                    >
                      Edit
                    </button>
                  }

                  {/* EVENT LINKS FRONT PAGE */}
                  <div className="flex gap-2">
                    {ev.ticketLink && !openEditModal && (
                      <OutDancingLink
                        link={ev.ticketLink}
                        title="Tickets"
                        target="_blank"
                        extraClassName="flex-0 bg-brand-pop px-2 md:px-6 mt-3 py-2 text-xs md:text-sm text-white hover:text-brand-pop hover:bg-white duration-[400ms] rounded-lg border-2 border-pink-600"

                      />
                    )}
                    {(ev.eventLink && !openEditModal) && (
                      <OutDancingLink
                        link={ev.eventLink}
                        title="Info"
                        target="_blank"
                        extraClassName="flex-0 bg-brand-pink px-2 md:px-6 mt-3 py-2 text-xs md:text-sm text-white hover:text-brand-pink hover:bg-white  duration-[400ms]  rounded-lg border-2 border-pink-900"
                      />
                    )}
                    </div>
                  </div>

                </div>
              </div>
            </AnimateOnScroll>
          </li>
        ))}
      </ul>
        </div>
    )
}
