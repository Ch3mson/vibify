import { getSession } from "next-auth/react";

export async function getProfile() {
    try {
        const session = await getSession()
        if (!session || !session.token.access_token) {
            console.error("No access token found in session");
            return null;
        }

        const response = await fetch('https://api.spotify.com/v1/me', {
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
        console.log("Profile data:", data);
        return data;

    } catch (error) {
        console.error("An error occurred while fetching the profile:", error);
        return null;
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

        const response = await fetch (`https://api.spotify.com/v1/recommendations?limit=50&market=CA&seed_genres=${genreID}`, {
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
        console.log("Recommended songs:", data);
        return data;

    } catch (error) {
        console.error("An error occurred while fetching recommended songs", error);
        return null;
    }
}