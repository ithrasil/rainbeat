// Axios
import axios from 'axios';

// Api
import {getUrl} from "Api/request.js";
import {normalizeResponse, normalizeApi} from "Api/response.js";

export const changeReceiveStatus = (boolean) => {
    return {
        type: "RECEIVE_STATUS",
        payload: boolean
    }
};

export const changeState = (boolean) => {
    return {
        type: "SEARCH_STATUS",
        payload: boolean
    }
};

export const updateFilter = (obj) => {
    return {
        type: "UPDATE_FILTER",
        payload: obj
    }
};

export const updateData = (data) => {
    return {
        type: "DATA_UPDATE",
        payload: data
    }
};

export const updateArtistTracks = (data) => {
    return {
        type: "ARTIST_UPDATE",
        payload: data
    }
};

export const updatePlaylistTracks = (data) => {
    return {
        type: "PLAYLIST_UPDATE",
        payload: data
    }
};

export const saveQuery = (event) => {
    if (event === "") {
        return {
            type: "QUERY_UPDATE",
            payload: ""
        }
    }
    return {
        type: "QUERY_UPDATE",
        payload: event.target.value
    }
};

// thunks

export const getData = (query, filters) => {
    return async (dispatch) => {

        let data = {};

        for (const type of ["tracks", "artists", "playlists"]) {
            data[type] = [];
            for (const api of ["soundcloud", "jamendo"]) {
                if (filters[type][api] === true) {
                    const url = getUrl(type, api, {"query": query, "limit": 10});
                    let result = await axios.get(url);
                    result = normalizeResponse(api, "normal", result);
                    const normalized = normalizeApi(type, api, result);
                    data[type] = [...data[type], ...normalized];
                }
            }
            data[type].sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }

        dispatch(updateData(data));
    }
};

export const getArtistTracks = (artist, index, artists) => {
    return async (dispatch) => {

        const api = artist.source;

        const url = getUrl('artistTracks', api, {"id": artist.id, "name": artist.name, "limit": 10});

        let tracks = await axios.get(url);

        tracks = normalizeResponse(api, "artistTracks", tracks);

        if (tracks.length === 0) {
            artists[index].isEmpty = true;
        }
        else {
            artists[index].tracks = normalizeApi("tracks", api, tracks);
        }

        dispatch(updateArtistTracks(artists))
    }
};

export const getPlaylistTracks = (playlist, index, playlists) => {
    return async (dispatch) => {

        const api = playlist.source;

        const url = getUrl('playlistTracks', api, {"id": playlist.id, "name": playlist.name, "limit": 10});

        let tracks = await axios.get(url);
        tracks = normalizeResponse(api, "playlistTracks", tracks);

        if (tracks.length === 0) {
            playlists[index].isEmpty = true;
        }
        else {
            tracks = normalizeApi("tracks", api, tracks);
            playlists[index].tracks = tracks;
        }
        dispatch(updatePlaylistTracks(playlists))

    }
};
