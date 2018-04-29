export const updateQueue = (array) => {
    return {
        type: "UPDATE_QUEUE",
        payload: array
    }
};

export const deleteTrack = (array) => {
    return {
        type: "DELETE_TRACK",
        payload: array
    }
};