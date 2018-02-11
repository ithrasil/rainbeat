// Axios
import axios from 'axios';

// Helpers
import { getUrl, normalizeTracks, normalizeSoundCloudAPI, normalizeJamendoAPI } from 'Helpers';

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
}

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
* @param  {Object} filters
*
* @return {function}
*/

export const getData = (query, filters) => {
  return async (dispatch) => {
		
		let data = {};
		let apis = ["soundcloud", "jamendo"];
		
		for(const cat of ["tracks"]) {
			data[cat] = []
			for(const api of apis) {
				if(filters[cat][api] == true) {
					let tracks = await axios.get(getUrl(cat, query, api.toUpperCase()))
					tracks = normalizeTracks(tracks, api.toUpperCase())
					data[cat] = [...data[cat], ...tracks]
				}
			}
			data[cat].sort(function(a, b){
				if(a.title < b.title) return -1;
				if(a.title > b.title) return 1;
				return 0;
			});
		}
		
		const artists = await axios.get(getUrl('users', query, "SOUNDCLOUD"));
		const playlists = await axios.get(getUrl('playlists', query, "SOUNDCLOUD"));
		
		dispatch(updateData([data.tracks, artists.data, playlists.data]));
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
		
		let sTracks = await axios.get(getUrl(`users/${id}/tracks`, "", "SOUNDCLOUD"));
		
		if(sTracks.data.length == 0) {
			artists = [...artists.slice(0, index), ...artists.slice(index+1, artists.length-1)];

			dispatch(updateArtistTracks(artists))
		}
		else {
			sTracks = normalizeTracks(sTracks, "SOUNDCLOUD")

			artists[index].tracks = sTracks;

			dispatch(updateArtistTracks(artists))
		}
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
		
		let sTracks = await axios.get(getUrl(`playlists/${id}/tracks`, "SOUNDCLOUD"));

		if(sTracks.data.length == 0) {
			return;
		}
		
		sTracks = normalizeTracks(sTracks.data, PATTERN["SOUNDCLOUD"])

		playlists[index].tracks = sTracks;

		dispatch(updatePlaylistTracks(playlists))
	}
}
