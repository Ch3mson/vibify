import { getSession } from "next-auth/react";

export async function getProfile() {
    try {
        const session = await getSession()
        if (!session || !session.token.access_token) {
            throw new Error("No access token found in session");
        }

        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${session.token.access_token}`
            }
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("API request failed:", response.status, response.statusText);
            console.error("Error body:", errorBody);
            
            let errorMessage;
            try {
                const errorJson = JSON.parse(errorBody);
                errorMessage = errorJson.error?.message || 'Unknown error occurred';
            } catch (e) {
                errorMessage = errorBody || 'Unknown error occurred';
            }

            if (errorMessage.includes("The access token expired")) {
                throw new Error("The access token expired");
            } else {
                throw new Error(`API request failed: ${errorMessage}`);
            }
        }

        const data = await response.json();
        console.log("Profile data:", data);
        return data;

    } catch (error) {
        console.error("An error occurred while fetching the profile:", error);
        throw error; // Re-throw the error so it can be caught in the component
    }
}

export async function getGenres() {
    try {
        const session = await getSession();
        if (!session || !session.token?.access_token) {
            console.error("No access token found in session");
            return null;
        }

        const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                Authorization: `Bearer ${session.token.access_token}`
            }
        });

        if (!response.ok) {
            console.error("API request failed:", response.status, response.statusText);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return null;
        }

        const data = await response.json();
        console.log("Available genres:", data.genres);
        return data.genres;

    } catch (error) {
        console.error("An error occurred while fetching genres:", error);
        return null;
    }
}

export async function getRecommendations(genreID) {
    try {
        const session = await getSession();
        if (!session || !session.token.access_token) {
            console.error("No access token found in session");
            return null;
        }
        // find a seed artist and seed track
        console.log("fetched from https://api.spotify.com/v1/recommendations?limit=50&market=CA&seed_genres=${genreID}&seed_tracks=0c6xIDDpzE81m2q797ordA")
        console.log("The genre ID is: " + genreID)
        const response = await fetch (`https://api.spotify.com/v1/recommendations?limit=28&market=CA&seed_genres=${genreID}`, {
            headers: {
                Authorization: `Bearer ${session.token.access_token}`
            }
        }
        );

        if (!response.ok) {
            console.error("API request failed:", response.status, response.statusText);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return null;
        }

        const data = await response.json();
        console.log("Recommended songs kekw:", data);
        return data;

    } catch (error) {
        console.error("An error occurred while fetching recommended songs", error);
        return null;
    }
}

export async function getTopRecentArtists() { // not work?
    try {
        const session = await getSession();
        
        if (!session || !session.token.access_token) {
            console.error("No access token found in session");
            return null;
        }

        const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
            headers: {
                Authorization: `Bearer ${session.token.access_token}`
            }
        });

        if (!response.ok) {
            console.error("API request failed:", response.status, response.statusText);
            const errorBody = await response.text();
            console.error("Error body:", errorBody);
            return null;
        }

        const data = await response.json();
        console.log("Top recent artists:", data);
        return data;

    } catch (error) {
        console.error("An error occurred while fetching genres:", error);
        return null;
    }
}

// https://api.spotify.com/v1/me/top/artists?limit=5