import {
    UPDATE_COHORTS,
    ADD_TOUCHPOINT,
    UPDATE_COMMITS,
    UPDATE_STUDENT,
    ADD_STUDENT
} from "../actionTypes"

const initialState = []

export default function(state = initialState, action) {
    let newState = [...state]

    switch (action.type) {
        case UPDATE_COHORTS: {
            newState = action.payload
            return newState
        }
        
        case UPDATE_STUDENT: {
            let newStudent = action.student
            let newCohorts = []

            newState.cohorts.forEach(cohort => {
                let studentIndex = cohort.students.findIndex(student => {return student.id === newStudent.id})

                if (studentIndex >= 0) {
                    let newCohort = {...cohort}
                    newCohort.students[studentIndex] = newStudent
                    newCohorts.push(newCohort)
                } else {
                    newCohorts.push(cohort)
                }
            })

            return newCohorts
        }
        
        case ADD_STUDENT: {
            let cohortIndex = newState.findIndex(cohort => {return cohort.id === action.cohortId})
            newState[cohortIndex].students.push(action.student)
            return newState
        }

        case ADD_TOUCHPOINT: {
            let newCohorts = []

            newState.cohorts.forEach(cohort => {
                let targetStudentIndex = cohort.students.findIndex(student => {return student.id === action.studentId})

                if (targetStudentIndex) {
                    let newCohort = {...cohort}
                    newCohort.students[targetStudentIndex].touchpoints.push(action.touchpointData)
                    newCohorts.push(newCohort)
                } else {
                    newCohorts.push(cohort)
                }
            })

            return newCohorts
        }

        default: {
            return newState
        }
    }
}