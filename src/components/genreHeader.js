'use client'

import { getProfile } from '@/actions/actions';
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from 'react'

export default function GenreHeader({ genre }) {
    const { data: session, status } = useSession();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // Initialize from localStorage, default to false if not set
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [profile, setProfile] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        if (status === 'authenticated' && !isLoggedIn) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
        } else if (status === 'unauthenticated' && isLoggedIn) {
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', 'false');
        }

        async function fetchData() {
            if (session && session.token.access_token) {
                try {
                    const profileData = await getProfile();
                    setProfile(profileData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    if (error.message === "The access token expired" || error.message.includes("No access token found in session")) {
                        setSessionExpired(true);
                        setIsLoggedIn(false);
                        localStorage.setItem('isLoggedIn', 'false');
                        await signOut({ redirect: false });
                    }
                }
            }
        }

        fetchData();
    }, [session, status, isLoggedIn]);

    if (isLoggedIn) {
        return (
            <div className="flex justify-between items-center py-4 px-8">
                <p className="text-slate-500">Home</p>
                <p className='text-slate-500'>
                    Genre: {genre}
                </p>
            </div>
        )
    }

    return (
        <div className="flex justify-between items-center py-4 px-8">
            <p>Not logged in</p>
            <button className="text-slate-500 hover:text-slate-200" onClick={() => signIn()}>Sign in</button>
        </div>
    )
}