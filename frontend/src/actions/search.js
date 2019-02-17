// Axios
import axios from 'axios'

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

    const url = `/${what}/${query}?soundcloud=${filters["soundcloud"]}&jamendo=${filters["jamendo"]}`

    const result = await axios.get(url)

    dispatch(actions[what](result.data))
  }
};

export const getArtistTracks = (artist, index, artists) => {
  return async (dispatch) => {

    const url = `/artist/${artist.id}/${artist.source}`;

    let results = await axios.get(url);

    if(results.data.length === 0) {
      artists.splice(index, 1);
    }
    else {
      artists[index].tracks = results.data;
    }

    dispatch(updateArtists(artists))
  }
};

export const getPlaylistTracks = (playlist, index, playlists) => {
  return async (dispatch) => {
    const url = `/playlist/${playlist.id}/${playlist.source}`;

    let results = await axios.get(url);

    if(results.data.length === 0) {
      playlists.splice(index, 1);
    }
    else {
      playlists[index].tracks = results.data;
    }

    dispatch(updatePlaylists(playlists))
  }
};
