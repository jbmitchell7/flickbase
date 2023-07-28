import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://api.themoviedb.org";
const readAccess = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2I5MDBhNjMxNzgxOTBkMjU1MDIzZWVlMzhiOTE2OCIsInN1YiI6IjYxNDM3NzE1OTQ1MGZlMDA4ZWNjNTY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AmUGwDike3WM66g1PBfSbuPGVfr8vU6m74KHxCxeTB4";

const tmdbFetch = async (url, method = "GET", payload = {}) => {

  let headers = {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${readAccess}`,
  };

  try {
    const status = await AsyncStorage.getItem("username");

    if (status) {
      const newToken = await AsyncStorage.getItem("token");
      headers.Authorization = `Bearer ${newToken}`;
    }

    const options = {
      headers,
      method,
      url: API_URL + url,
      data: payload,
    };

    const response = await axios(options);

    return response.data;
  } catch (err) {
    throw new Error("Error retrieving data");
  }
};

export const fetchPost = async (url, payload) =>
  tmdbFetch(url, "POST", payload);
export const fetchGet = async (url, payload) => tmdbFetch(url, "GET", payload);
export const fetchPut = async (url, payload) => tmdbFetch(url, "PUT", payload);
export const fetchDelete = async (url, payload) =>
  tmdbFetch(url, "DELETE", payload);
