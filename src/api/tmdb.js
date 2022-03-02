import axios from 'axios';

//const apiKey = 'api_key=77b900a63178190d255023eee38b9168'
const apiKey = process.env['API_KEY'];
const API_URL = 'https://api.themoviedb.org/3';

const tmdbFetch = async (url, method = 'GET', payload = {}) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
        //use AsyncStorage instead of localStorage for token storage
        // if (jwt) {
        //     headers.Authorization = `Bearer ${jwt}`
        // }

        const options = {
            headers,
            method,
            url: API_URL + url + apiKey,
            data: payload,
        }

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