import { API_URL } from '../../Config'
import callbackError from '../../Util'
import axios from 'axios'
import { Platform } from 'react-native';
import Expo from 'expo';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const verifyUserLogin = (email, password, deviceType, deviceToken, cbSuccess, cbError) => {
    const url = API_URL + '/v1/auth/login';
    var param = { "email": email, "password": password, "device_type": deviceType, "device_token": deviceToken };
    //console.log(param);
    const request = axios.post(url, param)

        .then((data) => {
            //console.log("Login success", data);
            if (cbSuccess) {
                cbSuccess(data.data)
                return data
            }
        })
        .catch((error) => {
            console.log("Login error", error);
            if (cbError) {
                cbError(error)
                return error.response
            }
        })

    return {
        payload: request,
        type: 'VerifyUser_Login'
    }
}
export const verifyFacebookLogin = async (first_name, last_name, email, facebook_id, device_type, device_token, cbSuccess, cbError) => {
    //console.log("==== Action verifyFacebookLogin =========");
    const url = API_URL + '/v1/auth/fblogin';
    var param = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "facebook_id": facebook_id,
        "device_type": Platform.OS,
        "device_token": device_token
    };
    //console.log("Parameters ", param);
    const request = axios.post(url, param)

        .then((data) => {
            //console.log("Data success : ", data);
            if (cbSuccess) {
                //console.log("Log of fb login success ", data.data.success_data);
                cbSuccess(data.data.success_data)
                return data
            }
        })
        .catch((error) => {
            console.log("Data error : ", error);
            if (cbError) {
                cbError(error.error_data)
                return error.response
            }
        })

    return {
        payload: request,
        type: 'User_Facebook_Login'
    }
}
export const forgotPassword = (email, cbSuccess, cbError) => {
    //console.log("--- Forgot password api entry ---");
    const url = API_URL + '/v1/auth/forgotpassword';
    var param = { "email": email };
    const request = axios.post(url, param, { headers: { "Content-Type": "application/json" } }).then((data) => {
        //console.log("Success forget password", data);
        if (data.data.status == "success") {
            cbSuccess(data.data)
            return data.data
        }
        else {
            if (data.error_data) {
                cbError(data.error_data);
            }
            else {
                cbError("Server error while processing your request, please try again.")
            }
            return data
        }
    })
        .catch((error) => {
            if (cbError) {
                console.log("Server error with forgot password", error);
                if (error.error_data) {
                    cbError(error.error_data);
                }
                else {
                    cbError("Server error while processing your request, please try again.")
                }
                return error.response
            }
        })
    return {
        payload: request,
        type: 'User_Login'
    }
}
export const register = (firstName, lastName, phone, email, password, deviceType, deviceToken, cbSuccess, cbError) => {
    const url = API_URL + '/v1/auth/register'

    var param = { first_name: firstName, last_name: lastName, email: email, device_type: deviceType, device_token: deviceToken, password: password, phone: phone };
    const request = axios.post(url, param, { headers: { 'Content-Type': 'application/json' } })
        .then((data) => {
            if (data.data.status == "success") {
                cbSuccess(data.data);
                return data.data;
            }
        })
        .catch((error) => {
            if (cbError) {
                cbError(error.response);
                return error.response;
            }
        })
    return {
        payload: request,
        type: 'User_Register'
    }
}
export const resendVerificationLink = (userId, languageId, cbSuccess, cbError) => {
    
    const url = API_URL + '/v1/auth/resend_verification'
    var param = { id: userId };
    const request = axios.post(url, param, { headers: { 'Content-Type': 'application/json', 'x-language': languageId } })
        .then((data) => {
            
            if (data.data.status == "success") {
                cbSuccess(data.data);
                return data.data;
            }
        })
        .catch((error) => {
            
            if (cbError) {
                cbError(error.response);
                return error.response;
            }
        })
    return {
        payload: request,
        type: 'Resend_Verification'
    }
}