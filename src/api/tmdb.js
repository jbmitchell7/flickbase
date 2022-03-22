import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//let apiV4Key = process.env['V4_KEY'];
let apiV4Key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2I5MDBhNjMxNzgxOTBkMjU1MDIzZWVlMzhiOTE2OCIsInN1YiI6IjYxNDM3NzE1OTQ1MGZlMDA4ZWNjNTY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AmUGwDike3WM66g1PBfSbuPGVfr8vU6m74KHxCxeTB4'
export const apiV3Key = 'api_key=77b900a63178190d255023eee38b9168';
//const apiV3Key = process.env['V3_KEY'];
const API_URL = 'https://api.themoviedb.org';

const tmdbFetch = async (url, method = 'GET', payload = {}) => {
    try {
        const headers = {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${apiV4Key}`
        }

        const options = {
            headers,
            method,
            url: API_URL + url,
            data: payload,
        }

        const response = await axios(options)

        return response.data

    } catch (err) {
        throw new Error("Error retrieving data")
    }
}

export const fetchPost = async (url, payload) => tmdbFetch(url, 'POST', payload);
export const fetchGet = async (url, payload) => tmdbFetch(url, 'GET', payload);
export const fetchPut = async (url, payload) => tmdbFetch(url, 'PUT', payload);
export const fetchPatch = async (url, payload) => tmdbFetch(url, 'PATCH', payload);

