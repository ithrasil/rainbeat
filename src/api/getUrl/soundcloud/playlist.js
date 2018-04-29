import {SOUNDCLOUD_ID} from "Constants/config";

export function playlist ({query, limit}) {
    return `https://api.soundcloud.com/playlists?q=${query}&limit=${limit}&client_id=${SOUNDCLOUD_ID}`;
}