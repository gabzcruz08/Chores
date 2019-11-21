import { API_URL, PAYPAL_URL } from '../../Config';
import axios from 'axios'
import { resolve } from 'url';
import i18n from 'react-native-i18n';
export const CreateBooking = (bookingObj, token, languageId, cbSuccess, cbError) => {
    const url = API_URL + `/v1/booking`;
    var header = {};
    if (token) {
        header = {
            "Authorization": token,
            "Content-Type": "application/json",
            Accept: 'application/json',
            "x-language": languageId,
        };
    }
    else {
        header = {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "x-language": languageId,
        };
    }
    // console.log("Create booking");
    //console.log("Create booking ", url, bookingObj, header);
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(bookingObj),
    }).then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            if (responseJson.status === "success") {
                //console.log("get bannner response", responseJson)
                if (cbSuccess) {
                    cbSuccess(responseJson.success_data);
                }
                return responseJson;
            }
            else {
                if (responseJson.status === "error") {
                    cbError(responseJson);
                }
                else {
                    cbError("Server error, please try again later.");
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