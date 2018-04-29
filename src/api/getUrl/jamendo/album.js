import {JAMENDO_ID} from "Constants/config";

export function albums ({query, limit}) {
    return `https://api.jamendo.com/v3.0/albums/?name=${query}&limit=${limit}&client_id=${JAMENDO_ID}`;
}