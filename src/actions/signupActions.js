import userApi from '../api/mockUserApi';

export function userSigninRequest(userData) {
    return dispatch => {
        return userApi.saveUser(userData);
    }
}

export function isUserExists(username) {
    return dispatch => {
        return userApi.isUserExists(username);
    }
}