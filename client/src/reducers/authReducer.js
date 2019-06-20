import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}

//https://prod.liveshare.vsengsaas.visualstudio.com/join?FCF92A7581AC3C694252994AFFD685464686