import { API_URL } from '../../Config';
import axios from 'axios';
import i18n from 'react-native-i18n';
export const getNotifications = (userId, accessToken, pageIndex, languageId, cbSuccess, cbError) => {
    const url = API_URL + '/v1/' + userId + '/notifications?pageIndex=' + pageIndex + '&pageSize=15';
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
            var unauthorised = i18n.t("Unauthorised");
            if (data.status === "success") {
                if (cbSuccess) {
                    cbSuccess(data.success_data);
                    return data;
                }
            }
            else {
                if (data.status === "error" && data.error_data === unauthorised) {
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
export const setLogoutState = (status, cbSuccess, cbError) => {
    return {
        payload: { status },
        type: 'SET_LOGOUT_STATE'
    }
}