export const SET_SEARCH = 'SET_SEARCH';
export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT'
export const SET_CHOICE = 'SET_CHOICE';
export const SET_WATCHLIST = 'SET_WATCHLIST';
export const SET_WATCHLIST_CHANGED = 'SET_WATCHLIST_CHANGED';
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

export function setWatchlist(value) {
    return { type: SET_WATCHLIST, value };
}

export function setWatchlistChanged(value) {
    return { type: SET_WATCHLIST_CHANGED, value };
}

export function setChoice(value) {
    return { type: SET_CHOICE, value };
}

export function setSearch(value) {
    return { type: SET_SEARCH, value };
}

export function setSearchResult(value) {
    return { type: SET_SEARCH_RESULT, value };
}

export function setLoginStatus(value) {
    return { type: SET_LOGIN_STATUS, value };
}