import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let apiV4Key = process.env['V4_KEY'];
export const apiV3Key = 'api_key=77b900a63178190d255023eee38b9168';
//const apiV3Key = process.env['V3_KEY'];
const API_URL = 'https://api.themoviedb.org';

const tmdbFetch = async (url, method = 'GET', payload = {}) => {

    //TODO Currently breaks login, eventually need to view account data
    // const status = await AsyncStorage.getItem('loggedIn');

    // if (status) {
    //     apiV4Key = await AsyncStorage.getItem('token');
    // }

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
        console.error('Error retrieving data', err)
    }
}

export const fetchPost = async (url, payload) => tmdbFetch(url, 'POST', payload);
export const fetchGet = async (url, payload) => tmdbFetch(url, 'GET', payload);
export const fetchPut = async (url, payload) => tmdbFetch(url, 'PUT', payload);
export const fetchPatch = async (url, payload) => tmdbFetch(url, 'PATCH', payload);

