// Axios
import axios from 'axios'

export const updateQuery = (query) => {
    return {
        type: "QUERY_UPDATE",
        payload: query,
    }
};


export const changeState = (boolean) => {
    return {
        type: 'SEARCH_STATUS',
        payload: boolean
    }
};

export const updateFilter = (obj) => {
    return {
        type: 'UPDATE_FILTER',
        payload: obj
    }
};

export const updateTracks = (tracks) => {
    return {
        type: 'TRACKS_UPDATE',
        payload: tracks
    }
};

export const updateArtists = (artists) => {
    return {
        type: 'ARTISTS_UPDATE',
        payload: artists
    }
};

export const updatePlaylists = (playlists) => {
    return {
        type: 'PLAYLISTS_UPDATE',
        payload: playlists
    }
};

// thunks

export const fetch = (what, query, filters) => {
    return async (dispatch) => {
        const actions = {"tracks": updateTracks, "artists": updateArtists, "playlists": updatePlaylists};
        for (const action of what) {
            const url = `/${action}/${query}?soundcloud=${filters[action]["soundcloud"]}&jamendo=${filters[action]["jamendo"]}`;
            const result = await axios.get(url);

            dispatch(actions[action](result.data))
        }
    }
};

export const getArtistTracks = (artist, index, artists) => {
    return async (dispatch) => {

        const url = `/artist/${artist.id}/${artist.source}`;

        let results = await axios.get(url);
        if (results.data.length === 0) {
            artists[index] = {...artists[index], empty: true};
        } else {
            artists[index].tracks = results.data;
        }

        dispatch(updateArtists(artists))
    }
};

export const getPlaylistTracks = (playlist, index, playlists) => {
    return async (dispatch) => {
        const url = `/playlist/${playlist.id}/${playlist.source}`;

        let results = await axios.get(url);

        if (results.data.length === 0) {
            playlists[index] = {...playlists[index], empty: true};
        } else {
            playlists[index].tracks = results.data;
        }

        dispatch(updatePlaylists(playlists))
    }
};
