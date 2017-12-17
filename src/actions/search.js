// Axios
import axios from 'axios';
import { getSoundCloudUrl } from 'Helpers';

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

export const getData = (query) => {
  return dispatch => {

		function getTracks() {
			return axios.get(getSoundCloudUrl('tracks', query));
		}

		function getArtists() {
			return axios.get(getSoundCloudUrl('users', query));
		}
		
		function getPlaylists() {
			return axios.get(getSoundCloudUrl('playlists', query));
		}

		axios.all([getTracks(), getArtists(), getPlaylists()])
			.then(axios.spread((tracks, artists, playlists) => {
				console.log(playlists.data)
				dispatch(updateData([tracks.data, artists.data, playlists.data]));
			}
		));

  }
}
