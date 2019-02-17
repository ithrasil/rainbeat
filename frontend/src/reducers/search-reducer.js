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

    case 'SEARCH_STATUS':
      state.status = action.payload
      break

    case 'TRACKS_UPDATE':
      state.tracks = action.payload.slice()
      break

    case 'ARTISTS_UPDATE':
      state.artists = action.payload.slice()
      break

    case 'PLAYLISTS_UPDATE':
      state.playlists = action.payload.slice()
      break
  }

  return state

}

