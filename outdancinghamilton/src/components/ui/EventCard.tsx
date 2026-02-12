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
  // Match up to the first sentence-ending punctuation
  const sentenceMatch = text.match(/.*?[.!?](\s|$)/);
  let firstSentence = sentenceMatch ? sentenceMatch[0] : text;

  // Only truncate at the first comma if the sentence is over 100 chars
  if (firstSentence.length > 80) {
    const commaIndex = firstSentence.indexOf(",");
    if (commaIndex !== -1) {
      return firstSentence.slice(0, commaIndex + 1); // include comma
    }
  }

  return firstSentence;
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

console.log("EVENT", events)
  
    return (
        <div>
        <AnimateOnScroll customVariants={fadeIn}>
      <h2 className="text-4xl md:text-6xl font-semibold mb-2 px-10 md:px-0 pt-8 pb-10 md:pb-20 font-[Bungee] text-shadow-lg text-brand-pink text-center">{heading}</h2>
      </AnimateOnScroll>
            <ul className="mx-auto max-w-5xl justify-center space-y-6 font-quicksand">
        {events.map((ev) => (
<li key={ev.id}>
            <AnimateOnScroll customVariants={slideInUpSoft}>
              <div className="md:grid md:grid-row-2 md:grid-cols-4 m-5 lg:m-0 lg:w-full bg-white/80 text-brand-base/80 rounded-lg shadow-xl">
                
                <div className="flex justify-between w-full border-b-4 md:border-none border-brand-pop bg-white/80 md:bg-none rounded-t-lg md:rounded-l-lg">
                  {/* Mobile DateCard */}
                  <div className="md:hidden mx-auto mt-5">
                    <DateCard date={ev.date} />
                  </div>
                  {ev.imgUrl && ev.imgUrl !== "[object File]" ? 
                    <img 
                    className="h-60 w-1/2 md:h-70 md:w-70 lg:h-90 object-cover md:mx-auto md:rounded-r-none rounded-tr-lg md:rounded-l-lg"
                    alt={ev.eventName} src={ev.imgUrl}/> :
                    <Image 
                    className="h-60 w-1/2 md:h-70 md:w-70 lg:h-90 object-cover md:mx-auto shadow-lg rounded-tr-lg md:rounded-r-none md:rounded-l-lg"
                    alt={ev.eventName} src={discoball}/>
                  }
                </div>

                <div className="col-span-2 p-8 md:p-0 md:pt-5 lg:pt-10 md:ml-5 lg:ml-10 text-xl space-y-3">
                  <p className={clsx(ev.eventName.length > 15 ? "text-2xl lg:text-3xl" : "text-2xl lg:text-4xl","font-bungee text-brand-pink text-shadow-md mb-1 lg:mb-2")}>{ev.eventName}</p>
                  <p className="text-base font-medium flex"><FaLocationDot className="mt-1 mr-2"/> {ev.location}</p>

                  <p className="text-sm md:text-base lg:text-lg font-semibold text-shadow-md">
                    {ev.description.length > 80 ? (
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



                  <div className="flex text-base">
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
                  {ev.age && <p className="text-lg md:mb-0 lg:mb-5">{ev.age}</p>}
                  <p className={clsx(ev.price.length > 5 ? "text-lg lg:text-2xl" : "text-3xl lg:text-4xl","font-bungee text-yellow-500 text-shadow-sm text-shadow-brand-pop pt-1 lg:pt-2")}>$ {ev.price}</p>

                </div>

                <div className="flex flex-col justify-between md:mb-5 lg:mb-10">
                  <div className="hidden md:flex">
                    <DateCard date={ev.date} />
                      </div>
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
<div className="flex justify-center md:justify-end gap-2 mt-3 mr-8 mb-5 md:mb-0">
  {ev.ticketLink && !openEditModal && (
    <OutDancingLink
      link={ev.ticketLink}
      title="Tickets"
      target="_blank"
      extraClassName="flex-0 bg-brand-pop px-2 md:px-6 py-2 text-xs md:text-sm text-white hover:text-brand-pop hover:bg-white duration-[400ms] rounded-lg md:rounded-l-lg border-2 border-pink-600"
    />
  )}
  {ev.eventLink && !openEditModal && (
    <OutDancingLink
      link={ev.eventLink}
      title="Info"
      target="_blank"
      extraClassName="flex-0 bg-brand-pink px-2 md:px-6 py-2 text-xs md:text-sm text-white hover:text-brand-pink hover:bg-white duration-[400ms] rounded-lg md:rounded-l-lg border-2 border-pink-900"
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
  <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50">
<div className="bg-white rounded-lg shadow-xl p-5 w-[85%] max-w-[280px] sm:max-w-xs md:max-w-md text-center">
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
