import axios from 'axios';

const API_KEY = 'api_key=77b900a63178190d255023eee38b9168';
const API_URL = 'https://api.themoviedb.org/3';

async function tmdbFetch(url, method = 'GET', payload = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        // // if (jwt) {
        // //     headers.Authorization = `Bearer ${jwt}`
        // // }

        const options = {
            headers,
            method,
            url: API_URL + url + API_KEY,
            body: payload,
        }

        // if (method === 'GET') {
        //     options.params = payload
        // } else {
        //     [options.data](http://options.data) = payload
        // }

        const response = await axios(options)

        return response.data

    } catch (err) {
        console.error('Error retrieving data', err)
    }
}

export const fetchPost = async (url, payload) => tmdbFetch(url, 'POST', payload);
export const fetchGet = async (url, payload) => tmdbFetch(url, 'GET', payload);
export const fetchPut = async (url, payload) => tmdbFetch(url, 'PUT', payload);
export const fetchPatch = async (url, payload) => tmdbFetch(url, 'PATCH', payload);