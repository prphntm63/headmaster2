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
    SET_COHORT_SORT_FILTER,
    SET_STUDENT_CARD_SORT_FILTER,
    SET_STUDENT_LIST_SORT_FILTER,
    SET_COHORT_HIDE_FILTER,
    SET_STUDENT_CARD_HIDE_FILTER,
    SET_STUDENT_LIST_HIDE_FILTER,
    SET_COHORT_SORT_DIRECTION,
    SET_STUDENT_CARD_SORT_DIRECTION,
    SET_STUDENT_LIST_SORT_DIRECTION,
    UPDATE_COHORTS,
    UPDATE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    ADD_TOUCHPOINT,
    UPDATE_COMMITS,
    UPDATE_STUDENT,
    ADD_STUDENT
} from "./actionTypes";

export const setCohortSortFilter = filter => ({
    type : SET_COHORT_SORT_FILTER,
    filter
})

export const setCohortSortDirection = direction => ({
    type : SET_COHORT_SORT_DIRECTION,
    direction
})

export const setStudentCardSortFilter = filter => ({
    type : SET_STUDENT_CARD_SORT_FILTER,
    filter
})

export const setStudentCardSortDirection = direction => ({
    type : SET_STUDENT_CARD_SORT_DIRECTION,
    direction
})

export const setStudentListSortFilter = filter => ({
    type : SET_STUDENT_LIST_SORT_FILTER,
    filter
})

export const setStudentListSortDirection = direction => ({
    type : SET_STUDENT_LIST_SORT_DIRECTION,
    direction
})

export const setCohortHideFilter = filter => ({
    type : SET_COHORT_HIDE_FILTER,
    filter
})

export const setStudentCardHideFilter = filter => ({
    type : SET_STUDENT_CARD_HIDE_FILTER,
    filter
})

export const setStudentListHideFilter = filter => ({
    type : SET_STUDENT_LIST_HIDE_FILTER,
    filter
})

export const updateCohorts = payload => ({
    type : UPDATE_COHORTS,
    payload
})

export const updateUser = payload => ({
    type : UPDATE_USER,
    payload
})

export const loginUser = payload => ({
    type : LOGIN_USER,
    payload
})

export const logoutUser = payload => ({
    type : LOGOUT_USER,
    payload
})

export const addTouchpoint = payload => ({
    type : ADD_TOUCHPOINT,
    payload : {
        studentId : payload.studentId,
        touchpointData : payload.touchpointData
    }
})

export const updateCommits = payload => ({
    type : UPDATE_COMMITS,
    payload : {
        studentId : payload.studentId,
        commitData : payload.commitData
    }
})

export const updateStudent = student => ({
    type : UPDATE_STUDENT,
    student
})

export const addStudent = payload => ({
    type : ADD_STUDENT,
    cohortId : payload.cohortId,
    student : payload.student
})