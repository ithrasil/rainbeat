import {artist} from "Api/getUrl/soundcloud/artist";
import {playlist} from "Api/getUrl/soundcloud/playlist";
import {track} from "Api/getUrl/soundcloud/track";
import {artistTracks} from "Api/getUrl/soundcloud/artistTracks";
import {playlistTracks} from "Api/getUrl/soundcloud/playlistTracks";

export function soundcloud(type, parameters) {
    const types = {
        "artists": artist,
        "playlists": playlist,
        "tracks": track,
        "artistTracks": artistTracks,
        "playlistTracks": playlistTracks
    };

    return types[type](parameters);
}