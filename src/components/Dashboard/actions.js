import { API_URL } from '../../Config';
import axios from 'axios'
import { updateLocale } from 'moment';
export const getDashboardServices = (languageId, cbSuccess, cbError) => {
    const url = API_URL + '/v1/categories';
    //const header = { "Authorization": "SVNodktqamRBMjJ0TFo2TjRVV1ZVV2pab1VyNFJ0c1BmeUQyTWNmN2ZCMk9YdHdWQ2dPZzJrVzlRZWJa5c0e68c50a3f7" };
    //console.log("Get deshboard service called");
    //console.log(url)
    const request = axios.get(url, { headers: { "x-language": languageId } })
        .then((data) => {
            //console.log("Get deshboard service success", data.data.success_data);
            if (cbSuccess) {
                cbSuccess(data.data.success_data);
                return data;
            }
        })
        .catch((error) => {
            console.log("Get deshboard service error ", error);
            if (cbError) {
                cbError(error)
                return error.response
            }
        })
    return {
        payload: request,
        type: 'Get_Service'
    }
}


export const getStateList = (languageId, cbSuccess, cbError) => {
    const url = API_URL + '/v1/statelist';
    const request = axios.get(url, { headers: { "x-language": languageId } })
        .then((data) => {
            if (cbSuccess) {
                cbSuccess(data.data.success_data);
                return data;
            }
        })
        .catch((error) => {
            if (cbError) {
                cbError(error)
                return error.response
            }
        })
    return {
        payload: request,
        type: 'Get_State_List'
    }

}
export const setLogoutState = (status, cbSuccess, cbError) => {
    return {
        payload: { status },
        type: 'SET_LOGOUT_STATE'
    }
}