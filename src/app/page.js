'use client'

import Header from "@/components/header";
import Hero from "@/components/hero";
import Genres from "@/components/genres";
import { useRef } from "react";

export default function Home() {

  const genresRef = useRef(null);

  return (
    <main>
      <Hero genresRef={genresRef} />
      <Genres ref={genresRef} />
    </main>
  )
}