// import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";

import {
    UPDATE_USER,
    LOGIN_USER,
    LOGOUT_USER
} from "../actionTypes"

const initialState = {
    accessToken: "",
    ctime: "",
    firstName: "",
    github: "",
    id: "",
    lastName: "",
    mtime: "",
    photoUrl: "",
    refreshToken: null,
    superuser: null
}

export default function(state = initialState, action) {
    
    let newState = {...state}

    switch (action.type) {
        case UPDATE_USER: {
            console.log(action.payload)
            newState = action.payload
            return newState
        }
        case LOGIN_USER: {
            return newState
        }
        case LOGOUT_USER: {
            return initialState
        }
        default: {
            return newState
        }
    }
}

// const initialState = {
//   allIds: [],
//   byIds: {}
// };

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case ADD_TODO: {
//       const { id, content } = action.payload;
//       return {
//         ...state,
//         allIds: [...state.allIds, id],
//         byIds: {
//           ...state.byIds,
//           [id]: {
//             content,
//             completed: false
//           }
//         }
//       };
//     }
//     case TOGGLE_TODO: {
//       const { id } = action.payload;
//       return {
//         ...state,
//         byIds: {
//           ...state.byIds,
//           [id]: {
//             ...state.byIds[id],
//             completed: !state.byIds[id].completed
//           }
//         }
//       };
//     }
//     default:
//       return state;
//   }
// }