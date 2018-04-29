export function playlistTracks(data) {
    if (data.data.results.length === 0) {
        return data.data.results;
    }
    else {
        return data.data.results[0].tracks;
    }
}