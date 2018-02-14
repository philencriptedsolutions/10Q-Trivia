import axios from 'axios';

//  ACTION TYPES

const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';

//  INITIAL STATE
const initialState = {
    user :{},
    isAuthenticated: false
}

//  ACTION CREATORS
    export function register(first_name, last_name, email, img, balance, uid) {
        return {
          type: REGISTER_USER,
          payload: axios
            .post("/api/register", { first_name, last_name, email, img, balance, uid})
            .then(response => response.data[0])
            .catch(console.log)
        };
    }
    export function login(google_id) {
        return {
          type: LOGIN_USER,
          payload: axios
            .post("/api/login", { google_id })
            .then(response => response.data[0])
            .catch(console.log)
        };
    }

//  REDUCER
export default function loginReducer(state = initialState, action){
    console.log(action.type);
    switch (action.type) {
        case `${REGISTER_USER}_PENDING`:
            return Object.assign({}, state, { isLoading: true });
        case `${REGISTER_USER}_FULFILLED`:
            return Object.assign({}, state, { isLoading: false, user: action.payload, isAuthenticated: true });
        case `${REGISTER_USER}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true });

        case `${LOGIN_USER}_PENDING`:
            return Object.assign({}, state, { isLoading: true });
        case `${LOGIN_USER}_FULFILLED`:
            return Object.assign({}, state, { isLoading: false, user: action.payload, isAuthenticated: true });
        case `${LOGIN_USER}_REJECTED`:
            return Object.assign({}, state, { isLoading: false, didErr: true });

        default:
            return state;
    }
}



