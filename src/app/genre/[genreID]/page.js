'use client'

import { getRecommendations } from '@/actions/actions'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function Page({ params }) {
  const { data: session, status } = useSession();
  const [recommended, setRecommended] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); // prevent alt tab refreshing

  const genre = params.genreID

  useEffect(() => {
    async function fetchRecommended() {
      if (session && session.token.access_token && !hasFetched) {
        try {
          const recommendedSongs = await getRecommendations(genre);
          setRecommended(recommendedSongs);
          setHasFetched(true);
        } catch (error) {
          console.error("Error fetching recommended songs:", error);
        }
      }
    }

    fetchRecommended();
  }, [genre, session, hasFetched]);

  return (
    <>
      <div>Genre: {genre}</div>
      {recommended && (
        <div>
          <h2>Recommended Songs:</h2>
          <ul>
            {recommended.tracks?.map((track) => (
              <li key={track.id}>{track.name} by {track.artists[0].name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}