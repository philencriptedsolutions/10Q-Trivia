// import axios from 'axios';

// //  ACTION TYPES

//         //This is a dummy action
//         const TEST_ACTION = 'TEST_ACTION';

// //  INITIAL STATE
// const initialState = {

// }

// //  ACTION CREATORS

//     //This is a dummy action
//     export function testAction() {
//         return {
//             type: TEST_ACTION,
//             payload: axios
//                 .get('/api/test')
//                 .then(response => response.data)
//                 .catch(err => err)
//         };
//     }

// //  REDUCER
//     //This is a dummy reducer
// export default function reducer(state = initialState, action){
//     console.log(action.type);
//     switch (action.type) {
//         case `${TEST_ACTION}_PENDING`:
//             return Object.assign({}, state, { isLoading: false, testData: action.payload });
//         case `${TEST_ACTION}_FULFILLED`:
//             return Object.assign({}, state, { isLoading: false,testData: action.payload})
//         case `${TEST_ACTION}_REJECTED`:
//             return Object.assign({}, state, { isLoading: false, didErr: true })

//         default:
//             return state;
//     }
// }
