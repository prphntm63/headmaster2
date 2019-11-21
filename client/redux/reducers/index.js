// import { combineReducers } from "redux";
// import visibilityFilter from "./visibilityFilter";
// import todos from "./todos";

// export default combineReducers({ todos, visibilityFilter });

import { combineReducers } from "redux"
import views from "./views"
import user from "./user"
import cohorts from "./cohorts"

export default combineReducers(
    {
        user,
        cohorts,
        views
    }
)
