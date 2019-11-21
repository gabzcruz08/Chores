import { API_URL } from '../../Config';
import i18n from 'react-native-i18n';
export const rateService = (accessToken, userId, bookingId, rating, languageId, cbSucess, cbError) => {
    var alreadyRated = i18n.t("alreadyRated");
    const url = API_URL + '/v1/booking/setrating';
    var body = {
        rating: rating,
        booking_id: bookingId,
        user_id: userId
    };
    var header = {
        "Content-Type": "application/json",
        "Authorization": accessToken,
        "x-language": languageId
    };
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                if (cbSucess) {
                    cbSucess(data);
                    return data;
                }
            }
            else {
                if (data.status === "error") {
                    cbError(data);
                }
                else if (data.status === "error" && data.success_data === alreadyRated) {
                    cbError(i18n.t('alreadyRated'))
                }
                else {
                    console.log("Rating error ", data.error_data);
                    cbError(data);
                }
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });;
}
export const dispatchBookingService = (accessToken, userId, bookingId, languageId, cbSucess, cbError) => {
    var alreadyRated = i18n.t("alreadyRated");
    const url = API_URL + '/v1/booking/dispatchbooking';
    var body = {
        "agent_id": userId,
        "booking_id":bookingId
    };
    var header = {
        "Content-Type": "application/json",
        "Authorization": accessToken,
        "x-language": languageId
    };
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                if (cbSucess) {
                    cbSucess(data.success_data);
                    return data;
                }
            }
            else {
                if (data.status === "error") {
                    cbError(data);
                }
                else if (data.status === "error" && data.success_data === alreadyRated) {
                    cbError(i18n.t('alreadyRated'))
                }
                else {
                    console.log("Rating error ", data.error_data);
                    cbError(data);
                }
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });;
}
export const completeBookingService = (accessToken, userId, bookingId, languageId, cbSucess, cbError) => {
    const url = API_URL + '/v1/booking/completdbooking';
    var body = {
        "agent_id": userId,
        "booking_id":bookingId
    };
    var header = {
        "Content-Type": "application/json",
        "Authorization": accessToken,
        "x-language": languageId
    };
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(body)
    }).then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                if (cbSucess) {
                    cbSucess(data.success_data);
                    return data;
                }
            }
            else {
                if (data.status === "error") {
                    cbError(data);
                }
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });
}