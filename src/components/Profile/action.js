import { API_URL } from '../../Config';

export const saveProfileAct = (userId, languageCode, accessToken, firstName, lastName, email, phone, cbSucess, cbError) => {
    //accessToken = "dd";
    const url = API_URL + `/v1/users/${userId}/updateProfile`;
    var body = {
        'first_name': firstName,
        'last_name': lastName,
        'phone': phone,
        'email': email,
    };
    var header = {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
        'x-language': languageCode
    };
    fetch(url, {
        method: 'PUT',
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
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });
}