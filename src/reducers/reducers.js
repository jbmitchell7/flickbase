import { combineReducers } from "redux";
import { SET_POPULAR, SET_SEARCH, SET_SEARCH_RESULT, SET_CHOICE } from "../actions/actions";

function popular(state = [], action) {
    switch (action.type) {
        case SET_POPULAR:
            return action.value;
        default:
            return state;
    }
}

function choice(state = {}, action) {
    switch (action.type) {
        case SET_CHOICE:
            return action.value;
        default:
            return state;
    }
}

function searchResult(state = [], action) {
    switch (action.type) {
        case SET_SEARCH_RESULT:
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
    searchResult,
    choice
});

export default flickbaseApp;