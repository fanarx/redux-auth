import userApi from '../api/mockUserApi';

export function login(userData) {
    return dispatch => {
        return userApi.login(userData);
    }
}

export function isUserExists(username) {
    return dispatch => {
        return userApi.isUserExists(username);
    }
}