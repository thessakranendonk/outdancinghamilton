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
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { MdContactSupport, MdOutlineDelete } from "react-icons/md";
import AdminContactModal from "./AdminContactModal";


function getFirstSentence(text: string) {
  // Match up to the first sentence-ending punctuation
  const sentenceMatch = text.match(/.*?[.!?](\s|$)/);
  let firstSentence = sentenceMatch ? sentenceMatch[0] : text;

  // Only truncate at the first comma if the sentence is over 90 chars
 if (firstSentence.length > 90) {
  const truncated = firstSentence.slice(0, 90);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.slice(0, lastSpace) + "...";
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

const [contactModal, setContactModal] = useState<{
  email: string;
  name: string;
  eventId: number;
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
      <h2 className="text-4xl md:text-6xl font-semibold mb-2 px-10 md:px-0 pt-8 pb-10 md:pb-20 font-[Bungee] text-shadow-lg text-brand-pink text-center">{heading}</h2>
      </AnimateOnScroll>
            <ul className="mx-auto max-w-5xl justify-center space-y-6 font-quicksand">
        {events.map((ev) => (
<li key={ev.id}>
            <AnimateOnScroll customVariants={slideInUpSoft}>
              <div className="md:grid md:grid-row-2 md:grid-cols-4 m-5 lg:m-0 lg:w-full bg-white/80 text-brand-base/80 rounded-lg shadow-xl">
                
                <div className="flex justify-between w-full border-b-4 md:border-none border-brand-pop bg-white/90 md:bg-none rounded-t-lg md:rounded-l-lg">
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
                  {ev.age && <p className="text-lg md:mb-0 lg:mb-2">{ev.age}</p>}
                  {(ev.price === "Free" || ev.price === "free") ?  
                  <p className={clsx(ev.price.length > 5 ? "text-lg lg:text-2xl" : "text-3xl lg:text-4xl","font-bungee text-yellow-500 text-shadow-sm text-shadow-brand-pop pt-1 lg:pt-2")}>Free</p> : 
                  <p className={clsx(ev.price.length > 5 ? "text-lg lg:text-2xl" : "text-3xl lg:text-4xl","font-bungee text-yellow-500 text-shadow-sm text-shadow-brand-pop pt-1 lg:pt-2")}>$ {ev.price}</p>}
                </div>

                <div className="flex flex-col justify-between md:mb-5 lg:mb-10">
                  <div className="hidden md:flex">
                    <DateCard date={ev.date} />
                      </div>
                  {/* ONLY VISIBLE FOR ADMIN */}
                  <div className="grid grid-cols-4 md:grid-cols-2 place-items-center gap-2 space-y-1 md:mt-2 px-10 md:pl-8 md:pr-15  lg:px-15 text-xl">
                  {rejectAction && (
                    // <form action={rejectAction}>
                    <>
                      <input type="hidden" name="id" value={ev.id} />
                      <DancingButton 
                      onclick={() =>
                          setContactModal({
                            email: ev.email,   // make sure this exists
                            name: ev.eventName,
                            eventId: ev.id,
                          })
                        }
                      title={<MdContactSupport className="ml-0.5"/>} 
                      tooltip="Reject or Contact" 
                      color="size-18 rounded-full bg-radial from-orange-400 from-20% to-orange-700 hover:from-orange-700 hover:to-orange-400 transition delay-50 duration-300 ease-in-out" />
                    </>
                    // </form>
                  )}

                  {openPopupModal &&
                    <DancingButton
                      onclick={() => openPopupModal(ev)}
                      title={<MdOutlineDelete className="ml-0.5" />}
                      tooltip="Delete"
                      color="size-18 rounded-full bg-radial from-red-400 from-20% to-red-700 hover:from-red-700 hover:to-red-400 transition delay-50 duration-300 ease-in-out"
                    />
                  }

                  {approveAction && (
                    <form action={approveAction}>
                      <input type="hidden" name="id" value={ev.id} />
                      <DancingButton title={<FaCheck className="ml-0.5"/>} tooltip="Approve" color="size-18 rounded-full bg-radial from-green-400 from-20% to-green-700 hover:from-green-600 hover:to-green-400 transition delay-50 duration-300 ease-in-out" />
                    </form>
                  )}

                  {openEditModal &&
                    <DancingButton
                      onclick={() => openEditModal(ev)}
                      title={<FaRegEdit className="ml-0.75 mb-0.5"/>}
                      tooltip="Edit"
                      color="size-18 rounded-full bg-radial from-blue-500 from-40% to-blue-900 hover:from-blue-900 hover:to-blue-500"
                    />
                  }
                </div>
                 {/* EVENT LINKS FRONT PAGE */}
<div className="flex justify-center md:justify-end gap-2 mt-3 md:mr-8 mb-5 md:mb-0">
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
      title="Details"
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
      {/* MODALS */}
{modalEvent && (
  <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/80">
<div className="bg-white rounded-lg shadow-xl p-5 w-[85%] md:max-w-[280px] sm:max-w-xs md:max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4 text-brand-pink font-[Bungee]">
        {modalEvent.name}
      </h2>
      <p className="text-md text-brand-base/80 font-quicksand">{modalEvent.description}</p>
      <div className="w-fit flex justify-center mx-auto">
      <button onClick={closeModal} className="bg-brand-pop px-2 md:px-6 py-2 mt-5 text-xs md:text-sm text-white hover:text-brand-pop hover:bg-white duration-[400ms] rounded-lg border-2 border-pink-600 text-white text-center p-2 rounded-full border-1 shadow-xl hover:bg-white font-medium">Close</button>
    </div>
    </div>
  </div>
)}

{contactModal && (
  <AdminContactModal
    isOpen={true}
    onClose={() => setContactModal(null)}
    participantEmail={contactModal.email}
    participantName={contactModal.name}
    eventId={contactModal.eventId}
  />
)}


        </div>
    )
}
