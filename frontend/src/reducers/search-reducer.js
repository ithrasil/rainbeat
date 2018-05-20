export default (state = {
                  received: false,
                  status: false,
                  albums: [],
                  artists: [],
                  tracks: [],
                  playlists: [],
                  query: '',
                  dummy: 1
                },
                action) => {

  switch (action.type) {

    case 'RECEIVE_STATUS':
      state.received = action.payload
      break

    case 'SEARCH_STATUS':
      state.status = action.payload
      break

    case 'TRACKS_UPDATE':
      state.tracks = action.payload
      break

    case 'ARTISTS_UPDATE':
      state.artists = action.payload
      break

    case 'PLAYLISTS_UPDATE':
      state.playlists = action.payload
      break

    case 'QUERY_UPDATE':
      state.query = action.payload
      localStorage.setItem('query', action.payload)
      break
  }

  return state

}

