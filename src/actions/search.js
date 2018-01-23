// Axios
import axios from 'axios';

// Helpers
import { getSCUrl, normalizeTracks, normalizeSoundCloudAPI, normalizeJamendoAPI } from 'Helpers';

// Constants
import { SOUNDCLOUD_PATTERN, JAMENDO_PATTERN } from 'Constants/patterns.js';

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
	if(event == "") {
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

/**
* Getting data from apis
*
* @function getData
*
* @param  {String} query
*
* @return {function}
*/

export const getData = (query) => {
  return async (dispatch) => {
		
		let sTracks = await axios.get(getSCUrl('tracks', query));
		let jTracks = await axios.get("//api.jamendo.com/v3.0/tracks/?client_id=97cc45f7&name=" + query); 
		
		const artists = await axios.get(getSCUrl('users', query));
		const playlists = await axios.get(getSCUrl('playlists', query));
		
		sTracks = normalizeTracks(sTracks.data, SOUNDCLOUD_PATTERN)
		jTracks = normalizeTracks(jTracks.data.results, JAMENDO_PATTERN)
		
		const tracks = sTracks.concat(jTracks)
		
		dispatch(updateData([tracks, artists.data, playlists.data]));
  }
}

/**
* Using artist name to get track list
*
* @function getArtistTracks
*
* @param  {Number} id
* @param  {Number} index
* @param  {Array} artists
*
* @return {function}
*/

export const getArtistTracks = (id, index, artists) => {
	return async (dispatch) => {
		
		let sTracks = await axios.get(getSCUrl(`users/${id}/tracks`, ""));
		
		if(sTracks.data.length == 0) {
			return;
		}
		
		sTracks = normalizeTracks(sTracks.data, SOUNDCLOUD_PATTERN)
		
		artists[index].tracks = sTracks;

		dispatch(updateArtistTracks(artists))
	}
}

/**
* Fetching tracks based on playlist
*
* @function getPlaylistTracks
*
* @param  {Number} id
* @param  {Number} index
* @param  {Array} artists
*
* @return {function}
*/

export const getPlaylistTracks = (id, index, playlists) => {
	return async (dispatch) => {
		
		let sTracks = await axios.get(getSCUrl(`playlists/${id}/tracks`, ""));

		if(sTracks.data.length == 0) {
			return;
		}
		
		sTracks = normalizeTracks(sTracks.data, SOUNDCLOUD_PATTERN)

		playlists[index].tracks = sTracks;

		dispatch(updatePlaylistTracks(playlists))
	}
}
