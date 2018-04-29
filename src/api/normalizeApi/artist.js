import {jamendo_pattern} from "Api/normalizeApi/artist/jamendo";
import {soundcloud_pattern} from "Api/normalizeApi/artist/soundcloud";

export function artist(api, artists) {
    const patterns = {
        "soundcloud": soundcloud_pattern,
        "jamendo": jamendo_pattern
    };

    let pattern = patterns[api];

    let normalized = [];

    for (const artist of artists) {
        normalized.push({
            name: artist[pattern.name],
            source: api,
            id: artist.id
        })
    }

    return normalized;
}