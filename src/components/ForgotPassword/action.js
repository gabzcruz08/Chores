import { API_URL } from '../../Config';

export const changePasswordAct = (password, newPassword, confirmPassword, userId, languageId, accessToken, cbSucess, cbError) => {
    const url = API_URL + `/v1/users/${userId}/changePassword`;
    var body = {
        'password': password,
        'new_password': newPassword,
        'confirm_password': confirmPassword
    };
    var header = {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
        'x-language': languageId
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
                    if (cbError) {
                        cbError(data);
                        return data;
                    }
                }
            }
        })
        .catch((error) => {
            console.error(error);
            cbError(error);
        });
}