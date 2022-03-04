import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const v4Key = process.env['V4_KEY'];
const API_URL = 'https://api.themoviedb.org';

const tmdbFetch = async (url, method = 'GET', payload = {}) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${v4Key}`
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