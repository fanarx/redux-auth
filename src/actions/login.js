import userApi from '../api/mockUserApi';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';


export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(userData) {
    return dispatch => {
        return userApi.login(userData)
                .then(res => {
                  const token = res.token;
                  localStorage.setItem('jwtToken', token);
                  console.log('token', jwtDecode(token));
                  dispatch(setCurrentUser(jwtDecode(token)));
                })
    }
}

export function isUserExists(username) {
    return dispatch => {
        return userApi.isUserExists(username);
    }
}