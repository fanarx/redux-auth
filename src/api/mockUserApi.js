import validateUser from '../common/validations/signup';

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
]


class UserApi {

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

            const { errors, isValid } = validateUser(user);
            if (!isValid) {
                reject(errors);
            }
            //let existingUser = users.find(u => u.username === user.username && u.password === user.password);
            users.push(user);
            resolve(user);
        }, delay);
        });
    }

    static logIn(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                const { errors, isValid } = validateUser(user);
                if (!isValid) {
                    reject(errors);
                }
                let existingUser = users.find(u => u.username === user.username && u.password === user.password);
                if (existingUser) {
                    resolve({ success: true });
                } else {
                    reject('User does not exist');
                }
            }, delay);
        })
    }
}

export default UserApi;