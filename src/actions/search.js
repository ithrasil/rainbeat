// Axios
import Axios from 'axios';

// Constants
import { CLIENT_ID } from 'Constants/config.jsx';

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
	console.log(obj)
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
//    dispatch(getDataRequested());
		
		const url = `https://api.soundcloud.com/tracks?client_id=${ CLIENT_ID }&q=${query}`;
		
    Axios.get(url)
      .then(response => {
				console.log(query)
        // set state for success
        const songs = response.data;

        if(songs.length == 0) return;
				dispatch(updateSecondaryList(songs));
      })
      .catch(error => {
        // set state for error
        dispatch(getDataFailed(error));
      })
  }
}
