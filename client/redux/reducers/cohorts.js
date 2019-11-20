import {
    SET_COHORT_SORT_FILTER,
    SET_STUDENT_SORT_FILTER,
    SET_COHORT_HIDE_FILTER,
    SET_STUDENT_HIDE_FILTER
} from "../actionTypes"

import {
    COHORT_SORT_FILTERS,
    STUDENT_SORT_FILTERS,
    COHORT_HIDE_FILTERS,
    STUDENT_HIDE_FILTERS
} from "../constants"

export default cohortSortFilter = (state = initialCohortSortFilter, action) => {
    let newState = {...state}
    if (action.type != SET_COHORT_SORT_FILTER) return newState

    switch (action.type) {
        case SET_COHORT_SORT_FILTER: {
            return action.payload.filter;
        }
        case SET_COHORT_HIDE_FILTER: {
            return action.payload.filter;
        }
        default : {
            return newState;
        }
    } 
}