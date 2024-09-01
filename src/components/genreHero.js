import React, { useRef } from 'react';
import { useSession } from "next-auth/react";

export default function GenreHero() {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <section className="col-span-full mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-16 mt-[-90px]">
          <div className="mx-auto flex w-full text-left ">
            <div className="mx-auto inline-flex">
              <div className="text-center">
                <h1
                  className="max-w-8xl text-4xl font-extrabold leading-none tracking-tighter 
                  text-slate-50 md:text-6xl lg:max-w-xl lg:text-7xl"
                >
                  <span
                    className="animate-move-bg bg-gradient-to-r from-[#25D765] 
                    via-[#4B0082] to-[#25D765] bg-[length:400%] bg-clip-text
                    text-transparent"
                  >
                    Vibify
                  </span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-500">
                  An application to see your recommended songs with each genre and import them to your spotify.
                  Created with Next.js, NextAuth, Tailwind CSS, and SpotifyAPI. code available {" "}
                  <a className='underline hover:text-slate-300' href="https://github.com/Ch3mson/vibify">
                    here 
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {session && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button onClick={scrollToGenres} className="animate-bounce">
            <svg className="w-8 h-8 text-slate-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}