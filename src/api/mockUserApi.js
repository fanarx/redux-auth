import validateUser from '../common/validations/signup';
import validateUserLogin from '../common/validations/login';
import jwt from 'jwt-simple';
import config from '../config';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.identifier, iat: timestamp }, config.secret);
}

const delay = 1200;

const users = [
    {
        username: 'user1',
        password: 'user1'
    },
    {
        username: 'user2',
        password: 'user2'
    },
    {
        username: 'user3',
        password: 'user3'
    }
];

function validateServerSide(user, otherValidations) {
    let { errors } = otherValidations(user);

    let existingUsername = users.find(u => u.username === user.username);
    let existingPassword = users.find(u => u.password === user.password);
    if (existingUsername) { errors.username = 'There is user with such username'}
    if (existingPassword) { errors.password = 'There is user with such password'}

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
    

}


class UserApi {

    static findByUsername(username) {
        let existingUser = users.find(u => u.username === username);
        debugger;
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Object.assign([], users));
        }, delay);
        });
    }

    static saveUser(user) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {

            const { errors, isValid } = validateServerSide(user, validateUser);
            if (!isValid) {
                reject(errors);
            }
            //let existingUser = users.find(u => u.username === user.username && u.password === user.password);
            users.push({ success: true });
            
            resolve(user);
        }, delay);
        });
    }

    static login(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                const { errors, isValid } = validateUserLogin(user);
                if (!isValid) {
                    reject(errors);
                }
                let existingUser = users.find(u => u.username === user.identifier && u.password === user.password);
                //debugger;
                if (existingUser) {
                    resolve({ token: tokenForUser(user) });
                    //resolve({ success: true });
                } else {
                    reject({ form: 'Invalid Credentials' });
                }
            }, delay);
        })
    }

    //     static auth(user) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {

    //             const { errors, isValid } = validateUserLogin(user);
    //             if (!isValid) {
    //                 reject(errors);
    //             }
    //             let existingUser = users.find(u => u.username === user.identifier && u.password === user.password);
    //             //debugger;
    //             if (existingUser) {
    //                 resolve({ success: true });
    //             } else {
    //                 reject('User does not exist');
    //             }
    //         }, delay);
    //     })
    // }

    static isUserExists(username) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                let existingUser = users.find(u => u.username === username);
                resolve(existingUser);
                // const { errors, isValid } = validateUser(user);
                // if (!isValid) {
                //     reject(errors);
                // }
                // let existingUser = users.find(u => u.username === user.username && u.password === user.password);
                // if (existingUser) {
                //     resolve({ success: true });
                // } else {
                //     reject('User does not exist');
                // }
            }, delay);
        })
    }
}

export default UserApi;