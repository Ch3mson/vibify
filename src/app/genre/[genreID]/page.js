'use client'

import { getRecommendations } from '@/actions/actions'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function Page({ params }) {

  const { data: session, status } = useSession();
  const [recommended, setRecommended] = useState(null);

  const genre = params.genreID
  

  useEffect(() => {
    async function fetchRecommended(genre) {
        console.log("Session:", session); 
        if (session && session.token.access_token) {
            console.log("Access Token:", session.token.access_token);
            try {
                const recommendedData = await getRecommendations(genre);
                console.log(recommended)
                console.log("fetched profile")
                setRecommended(recommendedData);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
    }

    fetchRecommended(genre);
}, [genre, session]);

  return (
    <>
      <div>genre: {genre}</div>
    </>
  )
}