import { API_URL, GMAP_KEY } from '../../Config';
export const GetFavouriteBannerOnService = (userId, service_id, token, cbSuccess, cbError) => {
    const url = API_URL + `/v1/banners/getfavourite`;
    var header = {};
    if (token) {
        header = {
            "Authorization": token,
            "Content-Type": "application/json",
            Accept: 'application/json',
            // "x-language": languageId,
        };
    }
    else {
        header = {
            "Content-Type": "application/json",
            Accept: 'application/json',
            // "x-language": languageId,
        };
    }
    //console.log("Get favourite banner wih service");
    var Data = {
        "user_id": userId,
        "service_id": service_id
    }
    //console.log("Get favourite banner with company details ", url, Data, header);
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(Data),
    }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === "success") {
                // console.log("get bannner response", responseJson)
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
                    cbError("Server error, please try again later");
                }
            }

        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });;
}



export const getDefaultAddresses = (userId, token, cbSuccess, cbError) => {
    const url = API_URL + `/v1/users/` + userId + `/addresses`;
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
    fetch(url, {
        method: 'GET',
        headers: header,
    }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === "success") {
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
                    cbError("Server error, please try again later");
                }
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });;
}

export const insertAddress = (userId, token, address, type, cbSuccess, cbError) => {
    const url = API_URL + `/v1/users/` + userId + `/addresses`;
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
    var body = {
        "address": address,
        "type": type
    }
    console.log(url, header, body);
    fetch(url, {
        method: 'post',
        headers: header,
        body: JSON.stringify(body),

    }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === "success") {
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
                    cbError("Server error, please try again later");
                }
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });;
}


export const updateAddress = (userId, token, address, type, addressId, cbSuccess, cbError) => {
    const url = API_URL + `/v1/users/` + userId + `/addresses/${addressId}`;
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
    var body = {
        "address": address,
        "type": type
    }
    console.log(url, header, body);
    fetch(url, {
        method: 'put',
        headers: header,
        body: JSON.stringify(body),
    }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.status === "success") {
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
                    cbError("Server error, please try again later");
                }
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });
}
export const setLogoutState = (status, cbSuccess, cbError) => {
    return {
        payload: { status },
        type: 'SET_LOGOUT_STATE'
    }
}
export const getAddressFromGeoCode = (lat, long, cbSuccess, cbError) => {
    let header = {
        "Content-Type": "application/json",
        Accept: 'application/json',
    };
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GMAP_KEY}`;
    fetch(url, {
        method: 'GET',
        headers: header,
    }).then((response) => response.json())
        .then((responseJson) => {
            if (cbSuccess) {
                cbSuccess(responseJson);
            }
        })
        .catch((error) => {
            if (cbError) {
                console.error(error);
                cbError(error);
            }
        });
}