import { API_URL } from "../../Config";
import axios from "axios";
import { resolve } from "url";
import i18n from "react-native-i18n";
export const GetServiceOnCategory = (categoryId, cbSuccess, cbError) => {
  const url = API_URL + `/v1/categories/${categoryId}/services`;
  //const header = { "Authorization": "SVNodktqamRBMjJ0TFo2TjRVV1ZVV2pab1VyNFJ0c1BmeUQyTWNmN2ZCMk9YdHdWQ2dPZzJrVzlRZWJa5c0e68c50a3f7" };
  //console.log("Get deshboard service called");
  //console.log(url)
  const request = axios
    .get(url)
    .then(data => {
      //console.log("Get service success", data.data.success_data);
      if (cbSuccess) {
        cbSuccess(data.data.success_data);
        return data;
      }
    })
    .catch(error => {
      //console.log("Get service error ", error);
      if (cbError) {
        cbError(error);
        return error.response;
      }
    });
  return {
    payload: request,
    type: "Get_Service"
  };
};

export const GetCompanyOnService = (
  serviceId,
  userId,
  accessToken,
  cbSuccess,
  cbError
) => {
  const url = API_URL + `/v1/getCompanyService`;
  const request = axios
    .post(
      url,
      { service_id: serviceId, user_id: userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        }
      }
    )
    .then(data => {
      if (cbSuccess) {
        cbSuccess(data.data.success_data);
        return data;
      }
    })
    .catch(error => {
      cbError(error);
      return error.response;
    });
  return {
    payload: request,
    type: "Get_Companies"
  };
};
export const GetSliderCompanies = (
  serviceId,
  stateId,
  accessToken = "",
  userId = null,
  cbSuccess,
  cbError
) => {
  const url = API_URL + `/v1/banners/slider`;
  const request = axios
    .post(
      url,
      { service_id: serviceId, state_id: stateId, user_id: userId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        }
      }
    )
    .then(data => {
      if (cbSuccess) {
        cbSuccess(data.data.success_data);
        return data;
      }
    })
    .catch(error => {
      cbError(error);
      return error.response;
    });
  return {
    payload: request,
    type: "GET_SLIDER_COMPANIES"
  };
};
export const GetBannersApi = (
  stateId,
  service_id,
  userId,
  token,
  languageId,
  cbSuccess,
  cbError
) => {
  const url = API_URL + `/v1/banners`;
  var header = {};
  if (token) {
    header = {
      Authorization: token,
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-language": languageId
    };
  } else {
    header = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-language": languageId
    };
  }

  //console.log("Get deshboard service called");
  if (!userId) {
    userId = null;
  }

  var Data = {
    state_id: stateId,
    service_id: service_id
    //"user_id": userId
  };
  //console.log("line number 56 ", Data);
  if (userId) {
    Data.user_id = userId;
  }
  //console.log("Get banners", url, Data, header);

  fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(Data)
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === "success") {
        //console.log("get bannner response", responseJson)
        if (cbSuccess) {
          cbSuccess(responseJson.success_data);
        }
        return responseJson;
      } else {
        if (responseJson.status === "error") {
          cbError(responseJson);
        } else {
          console.log("Get banner error ", responseJson);
          cbError("Server error, please try again later");
        }
      }
    })
    .catch(error => {
      console.error(error);
      cbError(error);
    });

  // const request = axios.post(url, Data, header)
  //     .then((data) => {
  //         //console.log("Get banners success", data.data.success_data);
  //         if (cbSuccess) {
  //             cbSuccess(data.data.success_data);
  //             return data;
  //         }
  //     })
  //     .catch((error) => {
  //         console.log("Get banners error ", error);
  //         if (cbError) {
  //             cbError(error)
  //             return error.response
  //         }
  //     });
  // return {
  //     payload: request,
  //     type: 'Get_Service'
  // }
};
export const LikeDisLikeBanner = (
  userId,
  service_id,
  banner_Id,
  is_favourite,
  token,
  languageId,
  cbSuccess,
  cbError
) => {
  const url = API_URL + `/v1/banners/favourite`;
  const header = { Authorization: token, "x-language": languageId };
  //console.log("Get deshboard service called");
  var Data = {
    user_id: userId,
    service_id: service_id,
    banner_id: banner_Id,
    is_favourite: is_favourite
  };
  //console.log("like dislike banner ", url, Data, header);
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
      "x-language": languageId
    },
    body: JSON.stringify(Data)
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === "success") {
        //console.log("get bannner response", responseJson.success_data)
        if (cbSuccess) {
          cbSuccess(responseJson.success_data);
        }
        return responseJson;
      } else {
        if (responseJson.status === "error") {
          cbError(responseJson);
        } else {
          cbError("Server error, please try again later");
        }
      }
    })
    .catch(error => {
      console.error(error);
      cbError(error);
    });
  // const request = axios.post(url, Data, header)
  //     .then((data) => {
  //         //console.log("Get banners success", data.data.success_data);
  //         if (cbSuccess) {
  //             cbSuccess(data.data.success_data);
  //             return data;
  //         }
  //     })
  //     .catch((error) => {
  //         console.log("Get banners error ", error);
  //         if (cbError) {
  //             cbError(error)
  //             return error.response
  //         }
  //     });
  // return {
  //     payload: request,
  //     type: 'Get_Service'
  // }
};
export const GetPhoneNumber = (cbSuccess, cbError) => {
  const url = API_URL + `/v1/setting`;
  //console.log("like dislike banner ", url);
  fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === "success") {
        //console.log("get bannner response", responseJson.success_data)
        if (cbSuccess) {
          cbSuccess(responseJson.success_data);
        }
        return responseJson;
      } else {
        if (responseJson.status === "error") {
          cbError(responseJson.error_data);
        } else {
          cbError("Server error while getting cutomer care number");
        }
      }
    })
    .catch(error => {
      console.error(error);
      cbError(error);
    });
};
export const GetFavouriteBannersApi = (
  service_id,
  userId,
  token,
  languageId,
  cbSuccess,
  cbError
) => {
  const url = API_URL + `/v1/banners/getfavourite`;
  var header = {
    Authorization: token,
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-language": languageId
  };
  //console.log("Get favourite banner service");
  if (!userId) {
    userId = null;
  }
  var Data = {
    user_id: userId,
    service_id: service_id
  };
  if (userId) {
    Data.user_id = userId;
  }
  //console.log("Get favourite banners", url, Data, header);
  fetch(url, {
    method: "POST",
    headers: header,
    body: JSON.stringify(Data)
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status === "success") {
        //console.log("get favourite bannner response", responseJson)
        if (cbSuccess) {
          cbSuccess(responseJson.success_data);
        }
        return responseJson;
      } else {
        if (responseJson.status === "error") {
          cbError(responseJson);
        } else {
          console.log("Get banner error ", responseJson);
          cbError("Server error, please try again later");
        }
      }
    })
    .catch(error => {
      console.error(error);
      cbError(error);
    });
};
export const setLogoutState = (status, cbSuccess, cbError) => {
  return {
    payload: { status },
    type: "SET_LOGOUT_STATE"
  };
};
export const GetCompanyDetails = (
  companyId,
  languageId,
  cbSuccess,
  cbError
) => {
  const url = API_URL + `/v1/company/${companyId}`;
  var header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-language": languageId
  };
  fetch(url, {
    method: "GET",
    headers: header
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status == "success") {
        if (cbSuccess) {
          cbSuccess(responseJson.success_data);
        }
        return responseJson;
      } else {
        if (responseJson.status === "error") {
          cbError(responseJson);
        } else {
          console.log("Get banner error ", responseJson);
          cbError("Server error, please try again later");
        }
      }
    })
    .catch(error => {
      console.error(error);
      cbError(error);
    });
};
