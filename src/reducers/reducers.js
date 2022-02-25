import { combineReducers } from "redux";
import { SET_POPULAR } from "../actions/actions";

function popular(state = [], action) {
    switch (action.type) {
        case SET_POPULAR:
            return action.value;
        default:
            return state;
    }
}

const flickbaseApp = combineReducers({
    popular,
});

export default flickbaseApp;