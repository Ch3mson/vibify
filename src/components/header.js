'use client'

import { getProfile } from '@/actions/actions';
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from 'react'

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

  if (session && profile) {
    return (
        <div className="flex justify-between items-center py-4 px-3 border-b">
            <p className="text-slate-500">Signed in as {session.user.email}</p>
            <p className="text-slate-500">Profile: {profile.display_name}</p>
        </div>
    )
  }

  return (
    <div className="flex justify-between items-center py-4 px-3 border-b">
    <p className="text-slate-500">Not Logged In</p>
    <p className="text-slate-500"></p>
</div>
  )
}