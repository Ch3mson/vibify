'use client'
import { getProfile } from '@/actions/actions';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ui/modeToggle';

export default function Header() {

    const { data: session, status } = useSession();
    const [profile, setProfile] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (session && session.token.access_token) {
                try {
                    const profileData = await getProfile();
                    setProfile(profileData);
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

    return (
        <div className="flex justify-between items-center py-4 px-8">
            <p>
                {status === 'authenticated' 
                    ? `Signed in as ${session.user.email}`
                    : 'No session found'}
            </p>
            
            <div className='flex gap-4 items-center'>
                {status === 'authenticated' && (
                    <Link 
                        href="/"
                        className='hover:text-slate-500 dark:hover:text-slate-200 text-base'
                    >
                        Home
                    </Link>
                )}
                <button 
                    onClick={() => status === 'authenticated' ? signOut() : signIn()} 
                    className='hover:text-slate-500 dark:hover:text-slate-200 text-base'
                >
                    {status === 'authenticated' ? 'Sign out' : 'Sign in'}
                </button>
                <ModeToggle />
            </div>
        </div>
    )
}