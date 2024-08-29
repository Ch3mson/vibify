import React from 'react'

export default function Hero() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="col-span-full mb-4 mx-auto w-full max-w-7xl px-5 md:px-12 lg:px-16">
        <div className="mx-auto flex w-full text-left">
          <div className="mx-auto inline-flex items-center align-middle">
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
  )
}