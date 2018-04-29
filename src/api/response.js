// normalize response
import {soundcloud as soundcloud_response}  from "Api/normalizeResponse/soundcloud";
import {jamendo as jamendo_response} from "Api/normalizeResponse/jamendo";

// normalize api
import {artist as artist_api}  from "Api/normalizeApi/artist";
import {playlist as playlist_api} from "Api/normalizeApi/playlist";
import {track as track_api} from "Api/normalizeApi/track";

export function normalizeResponse(api, type, data) {
    const apis = {
        "soundcloud": soundcloud_response,
        "jamendo": jamendo_response
    };

    return apis[api](type, data);
}

export function normalizeApi(type, api, data) {
    const types = {
        "artists": artist_api,
        "playlists": playlist_api,
        "tracks": track_api
    };

    return types[type](api, data);
}
