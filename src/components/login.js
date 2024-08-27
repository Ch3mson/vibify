'use client'

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { getProfile, getGenres } from "@/actions/actions";
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState(null);
    const [genres, setGenres] = useState([])

    useEffect(() => {
        async function fetchProfile() {
            console.log("Session:", session); 
            if (session && session.token.access_token) {
                console.log("Access Token:", session.token.access_token);
                try {
                    const profileData = await getProfile(session.token.access_token);
                    console.log(profileData)
                    console.log("fetched profile")
                    setProfile(profileData);
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            }
        }

        fetchProfile();
    }, [session]);

    useEffect(() => {
        async function fetchGenres() {
            if (session && session.token.access_token) {
                try {
                    const genreData = await getGenres(session.token.access_token)
                    console.log("called genres:");
                    console.log(genreData);
                    setGenres(genreData)
                } catch (error) {
                    console.error("error fetching genres");
                }
            }
        }
        fetchGenres();
    }, [session])

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (session) {
        return (
            <>
                <p>Signed in as {session.user.email}</p>
                {profile 
                &&
                <>
                <p>Profile name: {profile.display_name}</p>
                <p>Followers: {profile.followers.total}</p>
                <Image
                    src={profile.images[1].url} 
                    alt="Profile Picture"
                    width={100}  // Specify the width you want
                    height={100} // Specify the height you want
                />
                    <div className="flex flex-wrap gap-2.5">
                        {genres.map((genre, index) => (
                            <Link
                                key={index} 
                                href={`/genre/${encodeURIComponent(genre)}`}
                                className="px-2.5 py-1.5 bg-gray-200 rounded text-black no-underline"
                            >
                            {genre}
                        </Link>
                        ))}
                    </div>

                </>
                }
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }

    return (
        <>
            <p>Not signed in</p>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}