import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer.js";

const reactStore = createStore(rootReducer)
window.store = reactStore;

export default reactStore;

// https://codesandbox.io/s/9on71rvnyo