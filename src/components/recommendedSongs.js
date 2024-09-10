'use client'
import Link from 'next/link'
import { ArrowUpRightIcon, Music } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default function RecommendedSongs({ arrayOfSongs }) {
    if (!arrayOfSongs || arrayOfSongs.length === 0) {
        return <p>No recommended songs available.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {arrayOfSongs.map((track) => (
                <div key={track.id} className="flex flex-col h-full">
                    <Link
                        href={track.external_urls.spotify}
                        className='shadow-feature-card dark:shadow-feature-card-dark group relative rounded-xl p-2 block flex-grow flex flex-col'
                    >
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex items-center gap-3 flex-grow min-w-0'>
                                <Music className='w-4 h-4 flex-shrink-0' />
                                <h2 className='font-light dark:text-neutral-100 truncate'>{track.name}</h2>
                            </div>
                            <ArrowUpRightIcon className='w-4 h-4 opacity-0 transition-opacity group-hover:opacity-100 flex-shrink-0' />
                        </div>
                        <div className='relative w-full pt-[100%] rounded-lg overflow-hidden mt-auto'>
                            <Image 
                                fill
                                src={track.album.images[0].url} 
                                alt={track.name} 
                                className='rounded-lg object-cover'
                            />
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}