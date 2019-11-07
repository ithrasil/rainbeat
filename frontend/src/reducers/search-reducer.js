const defaultState = {
    received: false,
    status: false,
    albums: [],
    artists: [],
    tracks: [],
    playlists: [],
    query: '',
    dummy: 1
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'QUERY_UPDATE':
            state.query = action.payload;
            break;
        case 'SEARCH_STATUS':
            state.status = action.payload;
            break;
        case 'TRACKS_UPDATE':
            console.log(action.payload.slice());
            state.tracks = action.payload.slice();
            break;
        case 'ARTISTS_UPDATE':
            state.artists = action.payload.slice();
            break;
        case 'PLAYLISTS_UPDATE':
            state.playlists = action.payload.slice();
            break;
    }

    return state
}

