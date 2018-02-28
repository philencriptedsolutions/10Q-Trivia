import axios from "axios";

//  ACTION TYPES

const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const UPDATE_USER = "UPDATE_USER";
//  INITIAL STATE
const initialState = {
  user: {
    user_id: 1
  },
  isAuthenticated: false
};

//  ACTION CREATORS
export function register(first_name, last_name, email, img, balance, uid) {
  return {
    type: REGISTER_USER,
    payload: axios
      .post("/api/register", {
        first_name,
        last_name,
        email,
        img,
        balance,
        uid
      })
      .then(response => {
        return response.data[0];
      })
      .catch(console.log)
  };
}
export function login(uid) {
  return {
    type: LOGIN_USER,
    payload: axios
      .post("/api/login", { uid })
      .then(response => response.data[0])
      .catch(console.log)
  };
}
export function updateProfile(first_name, last_name, img, uid) {
  console.log("update profile reducer", first_name, last_name, img, uid);
  return {
    type: UPDATE_USER,
    payload: axios
      .put("/api/profile/update", { first_name, last_name, img, uid })
      .then(response => {
        return response.data[0];
      })
      .catch(console.log)
  };
}

//  REDUCER
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case `${REGISTER_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });
    case `${REGISTER_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload,
        isAuthenticated: true
      });
    case `${REGISTER_USER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });
    case `${LOGIN_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });
    case `${LOGIN_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload,
        isAuthenticated: true
      });
    case `${LOGIN_USER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });
    case `${UPDATE_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });
    case `${UPDATE_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });
    case `${UPDATE_USER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });
    default:
      return state;
  }
}
