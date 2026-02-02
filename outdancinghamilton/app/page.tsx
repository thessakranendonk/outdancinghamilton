"use client";


export default function Home() {
  return (
    <div className="flex h-screen font-sans">

      {/* Left side */}
 <section className="flex-1 bg-emerald-900 text-white relative p-12 flex flex-col">

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




        {/* Logo and nav */}
        {/* <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-yellow-400 mr-3"></div>
            <span className="font-semibold text-lg select-none">RetroCompany.</span>
          </div>
          <nav className="flex space-x-8 text-sm font-medium opacity-80">
            <a href="#" className="hover:opacity-100 transition-opacity">Home</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Profile</a>
            <a href="#" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Explore</a>
          </nav>
        </div> */}

        {/* Main heading and paragraph */}
        <div className="pl-10">
        <h1 className="text-6xl font-medium mb-6 tracking-tight leading-tight max-w-lg font-monoton mt-20">
          Out Dancing <br />
          <span className="text-pink-400">Hamilton</span>
        </h1>
        <p className="max-w-md mb-10 text-gray-300 leading-relaxed">
          <b>Out Dancing Hamilton</b> brings together Hamilton’s dance community, celebrating movement, connection, and fun. Dancing keeps you healthy, lifts your mood, and builds the sense of community we all crave.
        </p>

        {/* Button */}
        {/* <button className="inline-flex items-center bg-black text-white px-6 py-3 font-semibold rounded hover:bg-gray-900 transition">
          Sign Up
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button> */}

        {/* Social icons */}
        <div className="flex space-x-6 mt-auto text-gray-400 text-xl opacity-70">
          <a href="#" aria-label="Instagram" className="hover:text-white transition">In</a>
        </div>   
        </div>     
      </section>

      {/* Right side */}
      
      <section className="flex-1 bg-orange-400 relative pl-40 p-12 overflow-hidden">


        {/* Large Eye Sticker */}
        {/* <div className="absolute top-20 right-20 w-48 h-48 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg rotate-6 shadow-lg select-none">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full"></div>
          </div>
          <span className="absolute top-3 left-4 text-sm font-semibold tracking-wide select-none">All Eyes On You</span>
        </div> */}

        {/* Other Stickers */}

        <div className="absolute top-10 left-14 bg-yellow-400 px-4 py-2 rounded-lg shadow-md rotate-350 text-3xl  font-semibold text-red-700 select-none">
          Upcoming Events
          <br />
          <span className="text-red-500 text-sm italic"></span>
        </div>

       

      </section>

    </div>
  );
}

