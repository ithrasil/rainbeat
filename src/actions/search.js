// Axios
import Axios from 'axios';

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

export const updatePrimaryList = (obj) => { 
  return {
    type: "PRIMARY_LIST_UPDATE",
    payload: obj
  }
};

export const updateSecondaryList = (obj) => { 
  return {
    type: "SECONDARY_LIST_UPDATE",
    payload: obj
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
    // set state to "loading"
		// dispatch(getDataRequested());
		
    Axios.get(getSoundCloudUrl('tracks', query))
      .then(response => {
        // set state for success
        const songs = response.data;
				dispatch(updateSecondaryList(songs));
      })
      .catch(error => {
        // set state for error
        dispatch(getDataFailed(error));
    })
		
		Axios.get(getSoundCloudUrl('playlists', query))
      .then(response => {
        // set state for success
        const playlists = response.data;
				console.log(playlists[0].tracks)
      })
      .catch(error => {
        // set state for error
        dispatch(getDataFailed(error));
    })
		
  }
}
