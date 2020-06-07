import * as actionTypes from "../actions/types";
import { updateObject } from "../../utilities/updateObject";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const clearError = (state, action) => {
  return updateObject(state, {
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error.response.data.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.CLEAR_ERROR:
      return clearError(state, action);
    default:
      return state;
  }
};

export default reducer;
