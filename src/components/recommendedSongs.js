'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRightIcon, Music, ThumbsDown } from 'lucide-react';

export default function RecommendedSongs({ arrayOfSongs }) {
    const [songs, setSongs] = useState(arrayOfSongs);

    if (!songs || songs.length === 0) {
        return <p>No recommended songs available.</p>;
    }

    const handleDislike = (id) => {
        setSongs(songs.filter(song => song.id !== id));
        console.log(songs)
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {songs.map((track) => (
                <div key={track.id} className="flex flex-col h-full relative">
                    <Link
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shadow-feature-card dark:shadow-feature-card-dark group relative rounded-xl p-2 flex-grow flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3 flex-grow min-w-0">
                                <Music className="w-4 h-4 flex-shrink-0" />
                                <h2 className="font-light truncate">{track.name}</h2>
                            </div>
                            <ArrowUpRightIcon className="w-4 h-4 opacity-0 transition-opacity group-hover:opacity-100 flex-shrink-0" />
                        </div>
                        <div className="relative w-full pt-[100%] rounded-lg overflow-hidden mt-auto">
                            <Image
                                fill
                                src={track.album.images[0].url}
                                alt={track.name}
                                className="rounded-lg object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </Link>
                    <button
                        onClick={() => handleDislike(track.id)}
                        className="absolute bottom-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                    >
                        <ThumbsDown className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
