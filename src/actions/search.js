// Axios
import axios from 'axios';

// Api
import { normalizeTracks, normalizeArtists, normalizePlaylists } from "Api/normalize.js";

// Helpers
import { getUrl } from 'Helpers';

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
		let apis = ["soundcloud", "jamendo"] ;
		let normalizeFunctions = {
			"tracks": normalizeTracks,
			"artists": normalizeArtists,
			"playlists": normalizePlaylists
		}
		
		console.log(a)
		
		for(const cat of ["tracks", "artists", "playlists"]) {
			data[cat] = [];
			var a = 0;
			for(const api of apis) {
				if(filters[cat][api] == true) {
					let result = await axios.get(getUrl(cat, query, api.toUpperCase()))

					if(cat == "tracks") {
						if(api == "soundcloud") {
							result = result.data;
						}
						else {
							result = result.data.results;
						}
					}
					
					const resultNormalized = normalizeFunctions[cat](result, api.toUpperCase())
					data[cat] = [...data[cat], ...resultNormalized]
				}
			}
			data[cat].sort(function(a, b){
				if(a.name < b.name) return -1;
				if(a.name > b.name) return 1;
				return 0;
			});
		}
		
		dispatch(updateData([data.tracks, data.artists, data.playlists]));
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

export const getArtistTracks = (artist, index, artists) => {
	return async (dispatch) => {

		const source = artist.source.toUpperCase();

		const url = source == "SOUNDCLOUD" ? getUrl(`users/${artist.id}/tracks`, "", source) : getUrl(`artists/tracks`, artist.name + "&id=" + artist.id, source)

		let tracks = await axios.get(url);
	
		if(source == "SOUNDCLOUD") {
			tracks = tracks.data;
		}
		else {
			tracks = tracks.data.results[0].tracks;
		}

		if(tracks.length == 0) {
			artists[index].isEmpty = true;
		}
		else {
			tracks = normalizeTracks(tracks, source);
			artists[index].tracks = tracks;
		}
		
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

export const getPlaylistTracks = (playlist, index, playlists) => {
	return async (dispatch) => {
		
		const source = playlist.source.toUpperCase();

		const url = source == "SOUNDCLOUD" ? getUrl(`playlists/${playlist.id}/tracks`, "", source) : getUrl(`playlists/tracks`, playlist.name + "&id=" + playlist.id, source)

		let tracks = await axios.get(url);
	
		if(source == "SOUNDCLOUD") {
			tracks = tracks.data;
		}
		else {	
			if(tracks.data.results.length == 0) {
				tracks = tracks.data.results;
			}
			else {
				tracks = tracks.data.results[0].tracks;
			}
		}

		if(tracks.length == 0) {
			playlists[index].isEmpty = true;
		}
		else {
			tracks = normalizeTracks(tracks, source);
			playlists[index].tracks = tracks;
		}
		dispatch(updatePlaylistTracks(playlists))

	}
}
