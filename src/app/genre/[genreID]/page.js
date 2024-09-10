'use client'

import { getRecommendations } from '@/actions/actions'
import GenreHeader from '@/components/genreHeader';
import Header from '@/components/header';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import RecommendedSongs from '@/components/recommendedSongs'; // Assuming this is the correct path

export default function Page({ params }) {
  const { data: session, status } = useSession();
  const [recommended, setRecommended] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const genreID = params.genreID;

  useEffect(() => {
    async function fetchRecommended() {
      if (session?.token?.access_token && !hasFetched) {
        try {
          const recommendedSongs = await getRecommendations(genreID);
          setRecommended(recommendedSongs);
          setHasFetched(true);
        } catch (error) {
          console.error("Error fetching recommended songs:", error);
        }
      }
    }

    fetchRecommended();
  }, [session, hasFetched, genreID]);

  return (
    <> 
      <div>Genre: {genreID}</div>
      {recommended && recommended.tracks && (
        <div>
          <h2>Recommended Songs:</h2>
          <RecommendedSongs arrayOfSongs={recommended.tracks} />
        </div>
      )}
    </>
  );
}