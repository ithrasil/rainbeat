const defaultState = JSON.parse(localStorage.getItem('filters')) || {
    tracks: {jamendo: true, soundcloud: true},
    artists: {jamendo: true, soundcloud: true},
    albums: {jamendo: false, soundcloud: false},
    playlists: {jamendo: true, soundcloud: true}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_FILTER':
            localStorage.setItem('filters', JSON.stringify(action.payload))
            state = action.payload;
            break;
    }

    return state;
}