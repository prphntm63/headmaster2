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
    SET_COHORT_HIDE_FILTER,
    SET_STUDENT_LIST_SORT_FILTER,
    SET_STUDENT_LIST_HIDE_FILTER,
    SET_STUDENT_CARD_SORT_FILTER,
    SET_STUDENT_CARD_HIDE_FILTER
} from "../actionTypes"

import {
    COHORT_SORT_FILTERS,
    COHORT_HIDE_FILTERS,
    STUDENT_LIST_SORT_FILTERS,
    STUDENT_LIST_HIDE_FILTERS,
    STUDENT_CARD_SORT_FILTERS,
    STUDENT_CARD_HIDE_FILTERS
} from "../constants"

// const initialCohortSortFilter = COHORT_SORT_FILTERS.STARTDATE;
// const initialStudentSortFilter = STUDENT_SORT_FILTERS.STOPLIGHTSTATUS;
// const initialCohortHideFilter = COHORT_HIDE_FILTERS.ALL;
// const initialStudentHideFilter = STUDENT_HIDE_FILTERS.ALL;

const initialState = {
    "cohortSortFilter" : "startDate",
    "cohortHideFilter" : "active",
    "studentListSortFilter" : "stoplightStatus",
    "studentListHideFilter" : "active",
    "studentCardSortFilter" : "stoplightStatus",
    "studentCardHideFilter" : "active"
}

export default function(state = initialState, action) {
    let newState = {...state}
    
    switch (action.type) {
        case SET_COHORT_SORT_FILTER: {
            if (COHORT_SORT_FILTERS[action.payload.filter]) {
                newState.cohortSortFilter = COHORT_SORT_FILTERS[action.payload.filter];
            } else {
                newState.cohortSortFilter = COHORT_SORT_FILTERS.STARTDATE
            }
            return newState
        }
        case SET_STUDENT_LIST_SORT_FILTER: {
            if (STUDENT_LIST_SORT_FILTERS[action.payload.filter]) {
                newState.cohortSortFilter = STUDENT_LIST_SORT_FILTERS[action.payload.filter];
            } else {
                newState.cohortSortFilter = STUDENT_LIST_SORT_FILTERS.NAME
            }
            return newState
        }
        case SET_STUDENT_CARD_SORT_FILTER: {
            if (STUDENT_CARD_SORT_FILTERS[action.payload.filter]) {
                newState.cohortSortFilter = STUDENT_CARD_SORT_FILTERS[action.payload.filter];
            } else {
                newState.cohortSortFilter = STUDENT_CARD_SORT_FILTERS.NAME
            }
            return newState
        }
        case SET_COHORT_HIDE_FILTER: {
            if (COHORT_HIDE_FILTERS[action.payload.filter]) {
                newState.cohortSortFilter = COHORT_HIDE_FILTERS[action.payload.filter];
            } else {
                newState.cohortSortFilter = COHORT_HIDE_FILTERS.ACTIVE
            }
            return newState
        }
        case SET_STUDENT_LIST_HIDE_FILTER: {
            if (STUDENT_LIST_HIDE_FILTERS[action.payload.filter]) {
                newState.cohortSortFilter = STUDENT_LIST_HIDE_FILTERS[action.payload.filter];
            } else {
                newState.cohortSortFilter = STUDENT_LIST_HIDE_FILTERS.ACTIVE
            }
            return newState
        }
        case SET_STUDENT_CARD_HIDE_FILTER: {
            if (STUDENT_CARD_HIDE_FILTERS[action.payload.filter]) {
                newState.cohortSortFilter = STUDENT_CARD_HIDE_FILTERS[action.payload.filter];
            } else {
                newState.cohortSortFilter = STUDENT_CARD_HIDE_FILTERS.ACTIVE
            }
            return newState
        }
        default : {
            return newState;
        }
    } 
}

// export default studentListSortFilter = (state, action) => {
//     let newState = {...state}

//     switch (action.type) {
//         case SET_STUDENT_LIST_SORT_FILTER: {
//             if (STUDENT_LIST_SORT_FILTERS[action.payload.filter]) {
//                 newState.cohortSortFilter = STUDENT_LIST_SORT_FILTERS[action.payload.filter];
//             } else {
//                 newState.cohortSortFilter = STUDENT_LIST_SORT_FILTERS.NAME
//             }
//             return newState
//         }
//         default : {
//             return newState;
//         }
//     } 
// }

// export default studentCardSortFilter = (state, action) => {
//     let newState = {...state}

//     switch (action.type) {
//         case SET_STUDENT_CARD_SORT_FILTER: {
//             if (STUDENT_CARD_SORT_FILTERS[action.payload.filter]) {
//                 newState.cohortSortFilter = STUDENT_CARD_SORT_FILTERS[action.payload.filter];
//             } else {
//                 newState.cohortSortFilter = STUDENT_CARD_SORT_FILTERS.NAME
//             }
//             return newState
//         }
//         default : {
//             return newState;
//         }
//     } 
// }

// export default cohortHideFilter = (state, action) => {
//     let newState = {...state}

//     switch (action.type) {
//         case SET_COHORT_HIDE_FILTER: {
//             if (COHORT_HIDE_FILTERS[action.payload.filter]) {
//                 newState.cohortSortFilter = COHORT_HIDE_FILTERS[action.payload.filter];
//             } else {
//                 newState.cohortSortFilter = COHORT_HIDE_FILTERS.ACTIVE
//             }
//             return newState
//         }
//         default : {
//             return newState;
//         }
//     } 
// }

// export default studentListHideFilter = (state, action) => {
//     let newState = {...state}

//     switch (action.type) {
//         case SET_STUDENT_LIST_HIDE_FILTER: {
//             if (STUDENT_LIST_HIDE_FILTERS[action.payload.filter]) {
//                 newState.cohortSortFilter = STUDENT_LIST_HIDE_FILTERS[action.payload.filter];
//             } else {
//                 newState.cohortSortFilter = STUDENT_LIST_HIDE_FILTERS.ACTIVE
//             }
//             return newState
//         }
//         default : {
//             return newState;
//         }
//     } 
// }

// export default studentCardHideFilter = (state, action) => {
//     let newState = {...state}

//     switch (action.type) {
//         case SET_STUDENT_CARD_HIDE_FILTER: {
//             if (STUDENT_CARD_HIDE_FILTERS[action.payload.filter]) {
//                 newState.cohortSortFilter = STUDENT_CARD_HIDE_FILTERS[action.payload.filter];
//             } else {
//                 newState.cohortSortFilter = STUDENT_CARD_HIDE_FILTERS.ACTIVE
//             }
//             return newState
//         }
//         default : {
//             return newState;
//         }
//     } 
// }