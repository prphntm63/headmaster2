// import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./actionTypes";

// let nextTodoId = 0;

// export const addTodo = content => ({
//   type: ADD_TODO,
//   payload: {
//     id: ++nextTodoId,
//     content
//   }
// });

// export const toggleTodo = id => ({
//   type: TOGGLE_TODO,
//   payload: { id }
// });

// export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

import {
    COHORT_SORT_FILTER,
    STUDENT_SORT_FILTER,
    COHORT_HIDE_FILTER,
    STUDENT_HIDE_FILTER,
    UPDATE_COHORTS,
    UPDATE_USER,
    UPDATE_TOUCHPOINT,
    UPDATE_COMMITS
} from "./actionTypes";

export const setCohortSortFilter = filter => ({
    type : COHORT_SORT_FILTER,
    payload : { filter }
})

export const setStudentSortFilter = filter => ({
    type : STUDENT_SORT_FILTER,
    payload : { filter }
})

export const setCohortHideFilter = filter => ({
    type : COHORT_HIDE_FILTER,
    payload : { filter }
})

export const setStudentHideFilter = filter => ({
    type : STUDENT_HIDE_FILTER,
    payload : { filter }
})

export const updateCohorts = payload => ({
    type : UPDATE_COHORTS,
    payload : { payload }
})

export const updateUser = payload => ({
    type : UPDATE_USER,
    payload : { payload }
})

export const updateTouchpoint = payload => ({
    type : UPDATE_TOUCHPOINT,
    payload : {
        studentId : studentId,
        touchpointData : touchpointData
    }
})

export const updateCommits = payload => ({
    type : UPDATE_COMMITS,
    payload : {
        studentId : studentId,
        commitData : commitData
    }
})