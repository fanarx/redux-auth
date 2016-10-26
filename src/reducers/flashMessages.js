import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';

export default (state = [], action = {}) => {
    switch(action.type) {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];
        case DELETE_FLASH_MESSAGE:
            const idx = state.findIndex(m => m.id === action.id);
            return idx < 0 ?
            state 
             :
            [
                ...state.slice(0, idx),
                ...state.slice(idx + 1)
            ]

        default: return state;
    }
}