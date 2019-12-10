import {
    UPDATE_COHORTS,
    UPDATE_TOUCHPOINT,
    UPDATE_COMMITS,
} from "../actionTypes"

const initialState = []

export default function(state = initialState, action) {
    let newState = {...state}

    switch (action.type) {
        case UPDATE_COHORTS: {
            newState = action.payload
            return newState
        }
        default: {
            return newState
        }
    }
}