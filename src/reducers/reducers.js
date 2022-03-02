import { combineReducers } from "redux";
import { SET_POPULAR, SET_SEARCH } from "../actions/actions";

function popular(state = [], action) {
    switch (action.type) {
        case SET_POPULAR:
            return action.value;
        default:
            return state;
    }
}

function searchItem(state = '', action) {
    switch (action.type) {
        case SET_SEARCH:
            return action.value;
        default:
            return state;
    }
}

const flickbaseApp = combineReducers({
    popular,
    searchItem,
});

export default flickbaseApp;