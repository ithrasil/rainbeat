const defaultState = {id: 0};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_CARD':
            return {...state, id: action.payload};
        default:
            return {...state};
    }
}