import { API_URL } from '../../Config';
import axios from 'axios';
export const getSchedules = (monthYear, userId, accessToken, cbSuccess, cbError) => {
    const url = API_URL + '/v1/booking/calendar';
    const request = axios.post(url, { user_id: userId, month_year: monthYear }, { headers: { 'Content-Type': 'application/json', 'Authorization': accessToken } })
        .then((data) => {
            if (cbSuccess) {
                cbSuccess(data.data.success_data)
                return data
            }
        })
        .catch((error) => {
            cbError(error);
            return error.response
        })
    return {
        payload: request,
        type: 'Get_Schedules'
    }
}