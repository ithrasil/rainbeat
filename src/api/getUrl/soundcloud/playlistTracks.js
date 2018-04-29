import {SOUNDCLOUD_ID} from "Constants/config";

export function playlistTracks ({id, limit}) {
    return `https://api.soundcloud.com/playlists/${id}/tracks?limit=${limit}&client_id=${SOUNDCLOUD_ID}`;
}