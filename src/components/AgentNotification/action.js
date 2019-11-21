import { API_URL } from '../../Config';
import axios from 'axios';
import i18n from 'react-native-i18n';
export const getNotifications = (userId, accessToken, pageIndex, languageId, cbSuccess, cbError) => {
    const url = API_URL + '/v1/' + userId + '/notifications?pageIndex=' + pageIndex + '&pageSize=15';
    console.log(url, { 'Authorization': accessToken })
    const request = axios.get(url, { headers: { 'Authorization': accessToken, 'x-language': languageId } })
        .then((data) => {
            cbSuccess(data.data.success_data);

            return data;
        })
        .catch((error) => {
            cbError(error);
            return error.response
        })
    return {
        payload: request,
        type: 'Get_Notifications'
    }
}
export const acceptBooking = (userId, bookingID, accessToken, languageId, cbSuccess, cbError) => {
    const url = API_URL + '/v1/booking/acceptbooking';
    var body = {
        "agent_id": userId,
        "booking_id": bookingID
    }
    var header = {};
    if (accessToken) {
        header = {
            "Authorization": accessToken,
            "Content-Type": "application/json",
            Accept: 'application/json',
            "x-language": languageId
        };
    }
    else {
        header = {
            "Content-Type": "application/json",
            Accept: 'application/json',
        };
    }

    //console.log("Accept booking", url, body, header);

    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body),
    }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === "success") {
                //console.log("Accept booking response", responseJson)
                if (cbSuccess) {
                    cbSuccess(responseJson);
                }
                return responseJson.movies;
            }
            else {
                if (responseJson.status === "error") {
                    cbError(responseJson);
                }
                else {
                    console.log("Accept booking error ", responseJson);
                    cbError(responseJson.error_data);
                }
            }

        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });;

}
export const cancelBooking = (userId, bookingId, accessToken, languageId, cbSuccess, cbError) => {
    const url = API_URL + '/v1/booking/cancelbooking';
    var body = {
        "user_id": userId,
        "booking_id": bookingId
    };
    var header = {
        "Content-Type": "application/json",
        "Authorization": accessToken,
        Accept: 'application/json',
        "x-language": languageId,
    };
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                if (cbSuccess) {
                    cbSuccess(data.success_data);
                    return data;
                }
            }
            else {
                if (data.status === "error") {
                    cbError(data);
                }
                else {
                    console.log("Cancel booking error ", data.error_data);
                    cbError(data.error_data);
                }
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });;
}