// Axios
import axios from 'axios';
import { getSCUrl } from 'Helpers';

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
		
		const tracks = await axios.get(getSCUrl('tracks', query));
		const artists = await axios.get(getSCUrl('users', query));
		const playlists = await axios.get(getSCUrl('playlists', query));
		
		console.log(tracks.data)
		
		tracks.data.map(track => {
			track.SOURCE = "SoundCloud"
		});
		
		dispatch(updateData([tracks.data, artists.data, playlists.data]));
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
		
		const tracks = await axios.get(getSCUrl(`users/${id}/tracks`, ""));
		
		if(tracks.data.length == 0) {
			return;
		}
		
		tracks.data.map(track => {
			track.SOURCE = "SoundCloud"
		});
		
		artists[index].tracks = tracks.data;

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
		
		const tracks = await axios.get(getSCUrl(`playlists/${id}/tracks`, ""));

		if(tracks.data.length == 0) {
			return;
		}
		
		tracks.data.map(track => {
			track.SOURCE = "SoundCloud"
		});

		playlists[index].tracks = tracks.data;

		dispatch(updatePlaylistTracks(playlists))
	}
}
