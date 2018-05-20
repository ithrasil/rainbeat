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

export const updateData = (data) => {
  return {
    type: 'DATA_UPDATE',
    payload: data
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

export const getData = (query, filters) => {
  return async (dispatch) => {

    let data = {}

    for (const type of ['tracks', 'artists', 'playlists']) {
      data[type] = []
      for (const api of ['soundcloud', 'jamendo']) {
        if (filters[type][api] === true) {
          const url = `http://localhost:8000/${api}/${type}/${query}`;
          let result = await axios.get(url);
          data[type] = [...data[type], ...result.data]
        }
      }

    }

    dispatch(updateData(data))
  }
}