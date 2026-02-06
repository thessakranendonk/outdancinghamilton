'use client'
import { fadeIn, slideInUpSoft } from "@/src/lib/animations";
import { useState } from "react";
import AnimateOnScroll from "./animations/AnimateOnScroll";
import { OutDancingLink } from "./OutDancingLink";
import discoball from "@/public/images/discoball.jpg"
import Image from "next/image";
import DateCard from "./DateCard";
import { FaLocationDot } from "react-icons/fa6";
import clsx from "clsx";
import DancingButton from "./DancingButton";
import { event } from "@prisma/client";


function getFirstSentence(text: string) {
  const match = text.match(/.*?[.!?](\s|$)/);
  if (match) return match[0];
  return text; // fallback if no punctuation
}

export interface EventCardProps {
  events: event[];
  heading: string;
  approveAction?: (data: FormData) => Promise<void>;
  rejectAction?: (data: FormData) => Promise<void>;
  deleteAction?: (data: FormData) => Promise<void>;
  openEditModal?: (event: event) => void;
  openPopupModal?: (event: event) => void;
}

export default function EventCard({
  events,
  heading,
  approveAction,
  rejectAction,
  deleteAction,
  openEditModal,
  openPopupModal
}: EventCardProps) {
 const [modalEvent, setModalEvent] = useState<{
  name: string;
  description: string;
} | null>(null);

const openModal = (ev: { eventName: string; description: string }) =>
  setModalEvent({ name: ev.eventName, description: ev.description });

const closeModal = () => setModalEvent(null);

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
  
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
                  {ev.imgUrl && ev.imgUrl !== "[object File]" ? 
                    <img 
                    className="h-90 w-70 object-cover rounded-l-lg"
                    alt={ev.eventName} src={ev.imgUrl}/> :
                    <Image 
                    className="h-90 w-70 object-cover shadow-lg rounded-l-lg"
                    alt={ev.eventName} src={discoball}/>
                  }
                </div>

                <div className="col-span-2 mt-10 ml-10 text-xl space-y-3">
                  <p className={clsx(ev.eventName.length > 15 ? "text-3xl" : "text-4xl","font-bungee text-brand-pink text-shadow-md")}>{ev.eventName}</p>
                  <p className="text-lg font-semibold text-shadow-md">
                    {ev.description.length > 100 ? (
                      <>
                        {getFirstSentence(ev.description)}
                        <button
                          onClick={() => openModal(ev)}
                          className="hover:text-brand-pink underline ml-1 text-sm"
                        >
                          Show more
                        </button>
                      </>
                    ) : (
                      ev.description
                    )}
                  </p>
                  <p className={clsx(ev.location.length > 20 ? "text-lg" : "text-xl","flex")}><FaLocationDot className="mt-1 mr-2"/> {ev.location}</p>



                  <div className="flex">
                  <p>
                   {ev.date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })} - {ev.date.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                  </p>
                  {ev.endTime &&
                  <p>{" "}- {" "}{formatTime(ev.endTime)}</p>}
                  </div>
                  {ev.age && <p>{ev.age}</p>}
                  <p className={clsx(ev.price.length > 5 ? "text-2xl" : "text-4xl","font-bungee text-yellow-500 text-shadow-sm text-shadow-brand-pop pt-2")}>$ {ev.price}</p>

                </div>

                <div className="flex flex-col justify-between mb-10">
                    <DateCard date={ev.date} />

                  {/* ONLY VISIBLE FOR ADMIN */}
                  <div className="space-y-1 pr-10 pl-30">
                  {rejectAction && (
                    <form action={rejectAction}>
                      <input type="hidden" name="id" value={ev.id} />
                      <DancingButton title="Reject" color="bg-orange-400/80 border-orange-700 hover:text-orange-700" />
                    </form>
                  )}

                  {openPopupModal &&
                    <DancingButton
                      onclick={() => openPopupModal(ev)}
                      title="Delete"
                      color="bg-red-500/80 border-red-700 hover:text-red-700"
                    />
                  }

                  {approveAction && (
                    <form action={approveAction}>
                      <input type="hidden" name="id" value={ev.id} />
                      <DancingButton title="Approve" color="bg-green-400/80 border-green-600 hover:text-green-600" />
                    </form>
                  )}

                  {openEditModal &&
                    <DancingButton
                      onclick={() => openEditModal(ev)}
                      title="Edit"
                      color="bg-blue-700/80 border-blue-800 hover:text-blue-900"
                    />
                  }
                </div>
                 {/* EVENT LINKS FRONT PAGE */}
<div className="flex justify-end gap-2 mt-3 mr-8">
  {ev.ticketLink && !openEditModal && (
    <OutDancingLink
      link={ev.ticketLink}
      title="Tickets"
      target="_blank"
      extraClassName="flex-0 bg-brand-pop px-2 md:px-6 py-2 text-xs md:text-sm text-white hover:text-brand-pop hover:bg-white duration-[400ms] rounded-lg border-2 border-pink-600"
    />
  )}
  {ev.eventLink && !openEditModal && (
    <OutDancingLink
      link={ev.eventLink}
      title="Info"
      target="_blank"
      extraClassName="flex-0 bg-brand-pink px-2 md:px-6 py-2 text-xs md:text-sm text-white hover:text-brand-pink hover:bg-white duration-[400ms] rounded-lg border-2 border-pink-900"
    />
  )}
</div>
</div>
                
              </div>
            </AnimateOnScroll>
          </li>
        ))}
      </ul>
      {/* MODAL */}
{modalEvent && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-brand-pink font-[Bungee]">
        {modalEvent.name}
      </h2>
      <p className="text-md text-brand-base/80 font-quicksand">{modalEvent.description}</p>
      <div className="w-24 flex justify-center mx-auto">
      <DancingButton title="Close" onclick={closeModal} color="bg-brand-pop px-2 md:px-6 py-2 mt-5 text-xs md:text-sm text-white hover:text-brand-pop hover:bg-white duration-[400ms] rounded-lg border-2 border-pink-600" />
    </div>
    </div>
  </div>
)}

        </div>
    )
}
