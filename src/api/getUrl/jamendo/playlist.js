import {JAMENDO_ID} from "Constants/config";

export function playlist ({query, limit}) {
    return `https://api.jamendo.com/v3.0/playlists/?name=${query}&limit=${limit}&client_id=${JAMENDO_ID}`;
}