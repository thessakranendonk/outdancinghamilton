'use client'
import { event } from "@prisma/client";
import discoball from "@/public/images/discoball.jpg"
import Image from "next/image";
import { OutDancingLink } from "./OutDancingLink";
import AnimateOnScroll from "./animations/AnimateOnScroll";
import { fadeIn, slideInUp, slideInUpSoft } from "@/src/lib/animations";


export interface DashboardEventListProps {
  events: event[];
  heading: string;
  approveAction?: (data: FormData) => Promise<void>;
  rejectAction?: (data: FormData) => Promise<void>;
  deleteAction?: (data: FormData) => Promise<void>;
  openEditModal?: (event: event) => void;
  openPopupModal?: (event: event) => void;
}

export default function DashboardEventList({
  events,
  heading,
  approveAction,
  rejectAction,
  openEditModal,
  openPopupModal
}: DashboardEventListProps) {

  return (
    <div className="mb-25">
      <AnimateOnScroll customVariants={fadeIn}>
      <h2 className="text-6xl font-semibold mb-2 pt-8 pb-20 font-[Bungee] text-brand-pink text-center">{heading}</h2>
      </AnimateOnScroll>
      {events.length === 0 && <p className="text-3xl text-center font-[Bungee] mt-10">No events found</p>}
      <ul className="mx-auto max-w-5xl justify-center space-y-6">
        {events.map((ev) => (
          <li key={ev.id}>
            <AnimateOnScroll customVariants={slideInUpSoft}>
              <div className="grid grid-row-2 grid-cols-4 w-full bg-white/5 shadow-lg border-2 border-brand-pop rounded-lg p-10">
            <div className="col-span-1">{ev.imgUrl ? <img className="h-80 w-54 object-cover shadow-lg rounded-md" alt={ev.eventName} src={ev.imgUrl}/> :
            <Image className="h-80 w-54 object-cover shadow-lg rounded-md" alt={ev.eventName} src={discoball}/>
            }</div>

            <div className="grid grid-cols-2 col-span-3 gap-4 place-content-between text-white text-lg pl-2">
              <p className="col-span-2 text-4xl text-yellow-400 font-bold font-[Bungee] pb-2">{ev.eventName}</p>
             
              <p className=""><b><i>What:</i></b> {ev.description}</p>
               {ev.price && <p className="text-3xl text-yellow-400 font-semibold font-[Bungee] justify-self-end pr-5">${ev.price}</p>}
              
              <p className="col-span-2"><b><i>Where:</i></b> {ev.location}</p>
          
              
              <p className="col-span-2"><b><i>When:</i></b>{" "}
               {ev.date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })} - {ev.date.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
})}</p>
                  {ev.age && <p className="">{ev.age}</p>}
            </div>
            <div className="col-start-4 flex justify-end gap-2">

              {/* ONLY VISIBLE FOR ADMIN */}
              {rejectAction && (
                <form action={rejectAction}>
                  <input type="hidden" name="id" value={ev.id} />
                  <button className="bg-orange-400 text-white px-3 py-1 rounded">
                    Reject
                  </button>
                </form>
              )}
              {openPopupModal &&
                    <button
                  onClick={() => openPopupModal(ev)}
                    className="px-2 py-1 bg-error text-white rounded"
                  >
                    Delete
                  </button>}
                  
                    {approveAction && (
                      <form action={approveAction}>
                        <input type="hidden" name="id" value={ev.id} />
                        <button className="bg-green-500 text-white px-3 py-1 rounded">
                          Approve
                        </button>
                      </form>
                    )}
                    {/* Edit Button */}
                    {openEditModal &&
                <button
                  onClick={() => openEditModal(ev)}
                    className="px-2 py-1 bg-brand-pink text-white rounded"
                  >
                    Edit
                  </button>}

                  {/* EVENT LINKS FRONT PAGE */}
                <div className="flex space-x-4">
                  {ev.ticketLink && !openEditModal && (
                    <OutDancingLink
                      link={ev.ticketLink}
                      title="Tickets"
                      target="_blank"
                      extraClassName="bg-brand-pop px-2 md:px-8 mt-3 py-2 text-xs md:text-sm text-white hover:text-brand-pop hover:shadow-[inset_15rem_0_0_0] hover:shadow-white duration-[400ms] transition-[color,box-shadow] rounded-lg border-2 border-pink-900"

                   />
                  )}
                  {(ev.eventLink && !openEditModal) && (
                    <OutDancingLink
                      link={ev.eventLink}
                      title="Info"
                      target="_blank"
                      extraClassName="bg-brand-pink px-2 md:px-8 mt-3 py-2 text-xs md:text-sm text-white hover:text-brand-pop hover:shadow-[inset_15rem_0_0_0] hover:shadow-white duration-[400ms] transition-[color,box-shadow] rounded-lg border-2 border-pink-900"
                   />
                  )}

                  </div>
            </div>
            </div>
            </AnimateOnScroll>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
