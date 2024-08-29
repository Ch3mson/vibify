'use client'

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { getProfile, getGenres } from "@/actions/actions";
import Link from 'next/link';

export default function Login() {
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

    const gradientTextClass = "animate-move-bg bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-[length:400%] bg-clip-text text-transparent";
    const gradientButtonClass = "px-4 py-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 text-white font-bold rounded-lg hover:opacity-80 transition-opacity";

    if (session) {
        return (
            <section className="col-span-full mb-4 mx-auto w-full max-w-7xl items-center px-5 pb-6 md:px-12 lg:px-16">
                <div className="mx-auto flex w-full">
                    <div className="mx-auto w-full">
                        <div className="text-center">
                            {profile && (
                                <>
                                        <div className="flex flex-wrap justify-center gap-2.5 py-16">
                                            {genres.map((genre, index) => (
                                                <Link
                                                    key={index} 
                                                    href={`/genre/${genre}`}
                                                    className="text-white px-4 py-2 border-2 border-white rounded-lg
                                                            transform hover:scale-105 transition-all duration-200 ease-in-out"
                                                >
                                                    {genre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                </Link>
                                            ))}
                                        </div>
                                </>
                            )}
                            <button 
                                onClick={() => signOut()} 
                                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <p>Not signed in</p>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}