import {artistTracks} from "Api/normalizeResponse/jamendo/artistTracks";
import {playlistTracks} from "Api/normalizeResponse/jamendo/playlistTracks";
import {normal} from "Api/normalizeResponse/jamendo/normal";

export function jamendo(type, data) {
    const types = {
        "artistTracks": artistTracks,
        "playlistTracks": playlistTracks,
        "normal": normal
    };

    return types[type](data);
}