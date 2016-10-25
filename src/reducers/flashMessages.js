import { ADD_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';

debugger;
export default (state = [], action = {}) => {
    debugger;
    switch(action.type) {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ]
        default: return state;
    }
}