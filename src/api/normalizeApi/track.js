import {jamendo_pattern} from "Api/normalizeApi/track/jamendo";
import {soundcloud_pattern} from "Api/normalizeApi/track/soundcloud";

export function track(api, tracks) {
    const patterns = {
        "soundcloud": soundcloud_pattern,
        "jamendo": jamendo_pattern
    };
    let pattern = patterns[api];

    let normalized = [];

    for (const track of tracks) {
        normalized.push({
            artwork_url: pattern.artwork_url(track),
            big_artwork_url: pattern.big_artwork_url(track),
            artist: pattern.artist(track),
            source: api,
            stream_url: pattern.stream(track),
            name: track[pattern.title]
        })
    }

    return normalized;
}