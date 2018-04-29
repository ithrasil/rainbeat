import {artist} from "Api/getUrl/jamendo/artist";
import {playlist} from "Api/getUrl/jamendo/playlist";
import {track} from "Api/getUrl/jamendo/track";
import {artistTracks} from "Api/getUrl/jamendo/artistTracks";
import {playlistTracks} from "Api/getUrl/jamendo/playlistTracks";

export function jamendo(type, parameters) {
    const types = {
        "artists": artist,
        "playlists": playlist,
        "tracks": track,
        "artistTracks": artistTracks,
        "playlistTracks": playlistTracks
    };

    return types[type](parameters);
}