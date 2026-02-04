import { Event } from "@prisma/client";
import discoball from "@/public/images/discoball.jpg"
import Image from "next/image";

export interface DashboardEventListProps {
  events: Event[];
  heading: string;
  approveAction?: (data: FormData) => Promise<void>;
  rejectAction?: (data: FormData) => Promise<void>;
  deleteAction?: (data: FormData) => Promise<void>;
  openEditModal: (event: Event) => void;
  openPopupModal: (event: Event) => void;
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
      <h2 className="text-6xl font-semibold mb-2 py-8 font-[Bungee] text-brand-pink text-center">{heading}</h2>
      {events.length === 0 && <p className="text-3xl text-center font-[Bungee] mt-10">No events found</p>}
      <ul className="mx-auto max-w-5xl justify-center space-y-6">
        {events.map((event) => (
          <li key={event.id} className="grid grid-row-2 grid-cols-4 w-full bg-white/5 shadow-lg border-2 border-brand-pop rounded-lg p-10">
            
            <div className="col-span-1">{event.imgUrl ? <img className="h-80 w-54 object-cover shadow-lg rounded-md" alt={event.eventName} src={event.imgUrl}/> :
            <Image className="h-80 w-54 object-cover shadow-lg rounded-md" alt={event.eventName} src={discoball}/>
            }</div>

            <div className="grid grid-cols-2 col-span-3 gap-4 place-content-between text-white text-lg pl-2">
              <p className="col-span-2 text-4xl text-yellow-400 font-bold font-[Bungee] pb-2">{event.eventName}</p>
             
              <p className=""><b><i>What:</i></b> {event.description}</p>
               {event.price && <p className="text-3xl text-yellow-400 font-semibold font-[Bungee] justify-self-end pr-5">${event.price}</p>}
              
              <p className="col-span-2"><b><i>Where:</i></b> {event.location}</p>
          
              
              <p className="col-span-2"><b><i>When:</i></b> {event.date.toDateString()}</p>
                  {event.age && <p className="">Age Restrictions: {event.age}</p>}
            </div>
            <div className="col-start-4 flex justify-end gap-2">
              {rejectAction && (
                <form action={rejectAction}>
                  <input type="hidden" name="id" value={event.id} />
                  <button className="bg-orange-400 text-white px-3 py-1 rounded">
                    Reject
                  </button>
                </form>
              )}
        
              <button
            onClick={() => openPopupModal(event)}
              className="px-2 py-1 bg-error text-white rounded"
            >
              Delete
            </button>
            
              {approveAction && (
                <form action={approveAction}>
                  <input type="hidden" name="id" value={event.id} />
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Approve
                  </button>
                </form>
              )}
              {/* Edit Button */}
          <button
            onClick={() => openEditModal(event)}
              className="px-2 py-1 bg-brand-pink text-white rounded"
            >
              Edit
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
