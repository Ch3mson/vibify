'use client'

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { getProfile, getGenres } from "@/actions/actions";
import Link from 'next/link';

export default function Genres() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState(null);
    const [genres, setGenres] = useState([]);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (session && session.token.access_token) {
                try {
                    const profileData = await getProfile();
                    setProfile(profileData);
                    
                    const genreData = await getGenres();
                    setGenres(genreData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    if (error.message === "The access token expired" || error.message.includes("No access token found in session")) {
                        setSessionExpired(true);
                        await signOut({ redirect: false });
                    }
                }
            }
        }

        fetchData();
    }, [session]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (sessionExpired) {
        return (
            <>
                <p>Your session has expired. Please sign in again.</p>
                <button onClick={() => signIn()}>Sign in</button>
            </>
        );
    }

    if (session) {
        return (
            <section className="col-span-full mb-4 mx-auto w-full max-w-7xl items-center px-5 pb-6 md:px-12 lg:px-16">
                <div className="mx-auto flex w-full">
                    <div className="mx-auto w-full">
                        <div className="text-center">
                            {profile && (
                                <>
                                    <div className="flex-wrap flex-col justify-center grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
                                        {genres.map((genre, index) => (
                                            <Link
                                                key={index} 
                                                href={`/genre/${genre}`}
                                                className="text-slate-200 px-4 py-3 border-2 border-slate-400 rounded-lg
                                                        transform hover:scale-105 transition-all duration-200 ease-in-out"
                                            >
                                                {genre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}