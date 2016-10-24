import validateUser from '../common/validations/signup';

const users = [
    {
        id: 'user-1',
        username: 'user1',
        password: 'user1'
    },
    {
        id: 'user-2',
        username: 'user2',
        password: 'user2'
    },
    {
        id: 'user-3',
        username: 'user3',
        password: 'user3'
    }
]


class UserApi {

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
            }, 1200);
        })
    }
}

export default UserApi;