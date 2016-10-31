import eventApi from '../api/mockEventApi';

export function createEvent(event) {
    return dispatch => {
        return eventApi.create(event);
    }
}
