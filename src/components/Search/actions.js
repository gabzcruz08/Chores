import { API_URL } from '../../Config';
import axios from 'axios';

export const getCategories = (accessToken, languageId, cbSuccess, cbError) => {
    const url = API_URL + '/v1/categories';
    const request = axios.get(url, { headers: { 'Authorization': accessToken, 'x-language': languageId } })
        .then((data) => {
            if (cbSuccess) {
                cbSuccess(data.data);
                return data;
            }
        })
        .catch((error) => {
            if (cbError) {
                cbError(error);
                return error.response
            }
        })
    return {
        payload: request,
        type: 'Get_Categories'
    }
}
export const getSearchedCategories = (searchedText, languageId, cbSuccess, cbError) => {
    const url = API_URL + '/v1/search?keyword=' + searchedText;
    //console.log(url, searchedText);
    const request = axios.get(url, { headers: { "x-language": languageId } })
        .then((data) => {
            if (cbSuccess) {
                cbSuccess(data.data);
                return data;
            }
        })
        .catch((error) => {
            if (cbError) {
                cbError(error);
                return error.response
            }
        })
    return {
        payload: request,
        type: 'Get_SearchedCategories'
    }
}
export const setLogoutState = (status, cbSuccess, cbError) => {
    return {
        payload: { status },
        type: 'SET_LOGOUT_STATE'
    }
}