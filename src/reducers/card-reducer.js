export default (state = {id: 0}, action) => {
    var newState;

    switch (action.type) {
        case "CHANGE_CARD":
            newState = {...state, id: action.payload}
            break;
        default:
            newState = {...state}
            break;
    }

    return newState;
}