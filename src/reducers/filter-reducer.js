export default (state = {
                    tracks: {jamendo: true, soundcloud: true},
                    artists: {jamendo: true, soundcloud: true},
                    albums: {jamendo: false, soundcloud: false},
                    playlists: {jamendo: true, soundcloud: true}
                },
                action) => {

    switch (action.type) {

        case "UPDATE_FILTER":
            state = action.payload;
            break;
    }

    return state;

}