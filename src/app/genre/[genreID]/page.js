'use client'

import { getRecommendations } from '@/actions/actions'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import RecommendedSongs from '@/components/recommendedSongs';
import { Button } from '@/components/ui/button';

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
      <p className='text-center text-3xl font-bold sm:text-4xl p-8'>{genreID.charAt(0).toUpperCase() + genreID.slice(1)}</p>
      <div className='flex justify-center pb-8'>
        <Button>Import</Button>
      </div>
      {recommended && recommended.tracks && (
          <RecommendedSongs arrayOfSongs={recommended.tracks} />
      )}
    </>
  );
}