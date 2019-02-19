const defaultState = {
    list: JSON.parse(localStorage.getItem('query_list')) || [],
    title: 'Mixed'
};

function updateQueueList(payload) {
    const list = payload.list.slice(0);
    localStorage.setItem('query_list', JSON.stringify(list));
    return list;
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_QUEUE':
            state.title = action.payload.title;
            state.list = updateQueueList(action.payload);
            break;
        case 'DELETE_TRACK':
            localStorage.setItem('query_list', JSON.stringify(action.payload));
            state.list = action.payload;
            break;
    }

    return state;
}