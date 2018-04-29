import {SOUNDCLOUD_ID} from "Constants/config";

export function artist ({query, limit}) {
    return `https://api.soundcloud.com/users?q=${query}&limit=${limit}&client_id=${SOUNDCLOUD_ID}`;
}