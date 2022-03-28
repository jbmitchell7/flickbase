import { combineReducers } from "redux";
import {
    SET_POPULAR,
    SET_TRENDING,
    SET_TOP_RATED,
    SET_SEARCH,
    SET_SEARCH_RESULT,
    SET_CHOICE,
    SET_WATCHLIST,
    SET_LOGIN_STATUS,
} from "../actions/actions";

function popular(state = [], action) {
    switch (action.type) {
        case SET_POPULAR:
            return action.value;
        default:
            return state;
    }
}

function trending(state = [], action) {
    switch (action.type) {
        case SET_TRENDING:
            return action.value;
        default:
            return state;
    }
}

function topRated(state = [], action) {
    switch (action.type) {
        case SET_TOP_RATED:
            return action.value;
        default:
            return state;
    }
}

function watchlist(state = [], action) {
    switch (action.type) {
        case SET_WATCHLIST:
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
    popular,
    trending,
    topRated,
    searchItem,
    searchResult,
    choice,
    watchlist,
    loginStatus
});

export default flickbaseApp;