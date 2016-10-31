import jwt from 'jwt-simple';
import config from '../config';
import userApi from './mockUserApi';

const delay = 1200;

class EventApi {

    static create(event) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!event.token) {
                reject('Unauthorized: no token');
            } else {
                
                let token = event.token;
                try {

                let decoded = jwt.decode(token, config.secret);
                resolve({ success: true });

                } catch(err) {
                    //debugger;
                    reject('Invalid token');
                }

            }
            

        }, delay);
        });
    }

}

export default EventApi;