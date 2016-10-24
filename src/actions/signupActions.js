import userApi from '../api/mockUserApi';

export function userLoginRequest(userData) {
    return dispatch => {
        return userApi.logIn(userData);
    }
}