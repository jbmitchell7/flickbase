import { combineReducers } from "redux";
import {
    SET_SEARCH,
    SET_SEARCH_RESULT,
    SET_CHOICE,
    SET_WATCHLIST,
    SET_LOGIN_STATUS,
    SET_WATCHLIST_CHANGED
} from "../actions/actions";

function watchlist(state = [], action) {
    switch (action.type) {
        case SET_WATCHLIST:
            return action.value;
        default:
            return state;
    }
}

function watchlistChanged(state = true, action) {
    switch (action.type) {
        case SET_WATCHLIST_CHANGED:
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

function loginStatus(state = false, action) {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return action.value;
        default:
            return state;
    }
}

const flickbaseApp = combineReducers({
    searchItem,
    searchResult,
    choice,
    watchlist,
    loginStatus,
    watchlistChanged
});

export default flickbaseApp;