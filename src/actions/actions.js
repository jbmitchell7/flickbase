export const SET_POPULAR = 'SET_POPULAR';
export const SET_SEARCH = 'SET_SEARCH';

export function setPopular(value) {
    return { type: SET_POPULAR, value };
}

export function setSearch(value) {
    return { type: SET_SEARCH, value };
}