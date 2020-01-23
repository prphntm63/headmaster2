import { createStore } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./reducers/rootReducer.js";

const reactStore = createStore(rootReducer, composeWithDevTools( ));

// const reactStore = createStore(
//     rootReducer, /* preloadedState, */
//     +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//      );
// window.store = reactStore;

export default reactStore;

// https://codesandbox.io/s/9on71rvnyo