// import { SET_FILTER } from "../actionTypes";
// import { VISIBILITY_FILTERS } from "../../constants";

// const initialState = VISIBILITY_FILTERS.ALL;

// const visibilityFilter = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_FILTER: {
//       return action.payload.filter;
//     }
//     default: {
//       return state;
//     }
//   }
// };

// export default visibilityFilter;

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

const initialCohortSortFilter = COHORT_SORT_FILTERS.STARTDATE;
const initialStudentSortFilter = STUDENT_SORT_FILTERS.STOPLIGHTSTATUS;
const initialCohortHideFilter = COHORT_HIDE_FILTERS.ALL;
const initialStudentHideFilter = STUDENT_HIDE_FILTERS.ALL;

export default cohortSortFilter = (state = initialCohortSortFilter, action) => {
    switch (action.type) {
        case SET_COHORT_SORT_FILTER: {
            return action.payload.filter;
        }
        default : {
            return state;
        }
    } 
}

export default studentSortFilter = (state = initialStudentSortFilter, action) => {
    switch (action.type) {
        case SET_STUDENT_SORT_FILTER: {
            return action.payload.filter;
        }
        default : {
            return state;
        }
    } 
}

export default cohortHideFilter = (state = initialCohortHideFilter, action) => {
    switch (action.type) {
        case SET_COHORT_HIDE_FILTER: {
            return action.payload.filter;
        }
        default : {
            return state;
        }
    } 
}

export default studentHideFilter = (state = initialStudentHideFilter, action) => {
    switch (action.type) {
        case SET_STUDENT_HIDE_FILTER: {
            return action.payload.filter;
        }
        default : {
            return state;
        }
    } 
}