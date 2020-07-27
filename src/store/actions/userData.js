import axios from "axios";
import {
  addUserDataUrl,
  fetchUserDataUrl,
  updateUserDataUrl,
} from "../../constants/urls";
import { updateObject } from "../../utilities/updateObject";
import {
  ADD_USER_DATA_START,
  ADD_USER_DATA_SUCCESS,
  ADD_USER_DATA_FAIL,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAIL,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAIL,
  CLEAR_USER_DATA,
} from "./types";

export const addUserDataStart = () => {
  return {
    type: ADD_USER_DATA_START,
  };
};

export const addUserDataSuccess = (id, formValues, userId) => {
  return {
    type: ADD_USER_DATA_SUCCESS,
    userDataId: id,
    userData: formValues,
    userId: userId,
  };
};

export const addUserDataFail = (error) => {
  return {
    type: ADD_USER_DATA_FAIL,
    error: error,
  };
};

export const addUserData = (formValues, userId, token) => async (dispatch) => {
  const payload = updateObject(formValues, {
    userId: userId,
  });
  dispatch(addUserDataStart());
  axios
    .post(addUserDataUrl + token, payload)
    .then((response) => {
      dispatch(addUserDataSuccess(response.data.username, formValues, userId));
    })
    .catch((error) => {
      dispatch(addUserDataFail(error));
    });
};

export const fetchUserDataSuccess = (userData) => {
  return {
    type: FETCH_USER_DATA_SUCCESS,
    userData: userData,
  };
};

export const fetchUserDataFail = (error) => {
  return {
    type: FETCH_USER_DATA_FAIL,
    error: error,
  };
};

export const fetchUserData = (token, userId) => async (dispatch) => {
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  axios
    .get(fetchUserDataUrl + queryParams)
    .then((response) => JSON.stringify(response.data))
    .then((data) => {
      const result = JSON.parse(data);
      const fetchedUserData = [];
      for (let key in result) {
        fetchedUserData.push({
          ...result[key],
          id: key,
        });
      }
      dispatch(fetchUserDataSuccess(fetchedUserData));
    })
    .catch((error) => {
      console.error(error);
      dispatch(fetchUserDataFail(error));
    });
};

export const updateUserDataSuccess = (id, formValues, userId) => {
  return {
    type: UPDATE_USER_DATA_SUCCESS,
    userDataId: id,
    userData: formValues,
    userId: userId,
  };
};

export const updateUserDataFail = (error) => {
  return {
    type: UPDATE_USER_DATA_FAIL,
    error: error,
  };
};

export const updateUserData = (formValues, id, userId, token) => async (
  dispatch
) => {
  const payload = updateObject(formValues, {
    userId: userId,
  });
  axios
    .put(updateUserDataUrl + id + ".json?auth=" + token, payload)
    .then(() => {
      dispatch(fetchUserData(token, userId));
    })
    .catch((error) => {
      dispatch(updateUserDataFail(error));
    });
};

export const clearUserData = () => {
  return {
    type: CLEAR_USER_DATA,
  };
};
