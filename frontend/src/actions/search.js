// Axios
import axios from 'axios'

export const changeReceiveStatus = (boolean) => {
  return {
    type: 'RECEIVE_STATUS',
    payload: boolean
  }
}

export const changeState = (boolean) => {
  return {
    type: 'SEARCH_STATUS',
    payload: boolean
  }
}

export const updateFilter = (obj) => {
  return {
    type: 'UPDATE_FILTER',
    payload: obj
  }
}

export const updateTracks = (tracks) => {
  return {
    type: 'TRACKS_UPDATE',
    payload: tracks
  }
}

export const updateArtists = (artists) => {
  return {
    type: 'ARTISTS_UPDATE',
    payload: artists
  }
}

export const updatePlaylists = (playlists) => {
  return {
    type: 'PLAYLISTS_UPDATE',
    payload: playlists
  }
}


export const saveQuery = (event) => {
  if (event === '') {
    return {
      type: 'QUERY_UPDATE',
      payload: ''
    }
  }
  return {
    type: 'QUERY_UPDATE',
    payload: event.target.value
  }
}

// thunks

export const fetch = (what, query, filters) => {
  return async (dispatch) => {

    const actions = {"tracks": updateTracks, "artists": updateArtists, "playlists": updatePlaylists};
    let data = []

    for (const api of ['soundcloud', 'jamendo']) {
      if (filters[api] === true) {
        const url = `http://localhost:8000/${api}/${what}/${query}`
        let result = await axios.get(url)
        data = [...data, ...result.data]
      }
    }

    dispatch(actions[what](data))
  }
}
