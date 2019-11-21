import { API_URL, PAYPAL_URL } from './../Config';
import base64 from 'react-native-base64';
export const paymentPaypal = (userName, passWord, cbSuccess, cbError) => {
    var base64encodedData = base64.encode(userName + ':' + passWord)
    const url = PAYPAL_URL + '/v1/oauth2/token';
    var header = {
        'Authorization': 'Basic ' + base64encodedData,
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    var body = {
        "grant_type": 'client_credentials',
    };

    let formBody = [];
    for (let property in body) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(url, {
        method: 'POST',
        headers: header,
        body: formBody
    }).then((response) => response.json())
        .then((data) => {
            //console.log(data);
            cbSuccess(data);
            return data;
        })
        .catch((error) => {
            console.log(error);
            cbError(error);
        });;
}
export const CreateBooking = (bookingObj, token, cbSuccess, cbError) => {
    const url = API_URL + `/v1/booking`;
    var header = {};
    if (token) {
        header = {
            "Authorization": token,
            "Content-Type": "application/json",
            Accept: 'application/json',
        };
    }
    else {
        header = {
            "Content-Type": "application/json",
            Accept: 'application/json',
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
                if (responseJson.status === "error" && responseJson.error_data === "Unauthorised") {
                    cbError("Unauthorized");
                }
                else {
                    cbError("Server error, please try again later");
                }
            }

        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });
}
export const ChangeLanguage = (languageCode, cbSuccess, cbError) => {
    let languagecode = languageCode;
    // cbSuccess(languageCode);
    return {
        payload: languagecode,
        type: 'LANGUAGE_CHANGED'
    }
}
export const LogoutState = (isPressed, cbSuccess, cbError) => {
    let isButtonPressed = isPressed;
    return {
        payload: { isButtonPressed },
        type: 'LOGOUT_PRESSED'
    }
}