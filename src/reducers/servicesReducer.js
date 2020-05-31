import * as actionTypes from "../actions/types";
import { updateObject } from "../utilities/updateObject";

const initialState = {
  services: null,
  error: false,
  selectedService: null,
  loading: false
};

const servicesStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const setServices = (state, action) => {
  return updateObject(state, {
    services: {
      men: action.services.men,
      women: action.services.women
    },
    error: false,
    loading: false
  });
};

const fetchServicesFailed = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const setSelectedService = (state, action) => {
  return updateObject(state, {
    selectedService: action.setSelectedService
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SERVICES_START:
      return servicesStart(state, action);
    case actionTypes.SET_SERVICES:
      return setServices(state, action);
    case actionTypes.FETCH_SERVICES_FAILED:
      return fetchServicesFailed(state, action);
    case actionTypes.SET_SELECTED_SERVICE:
      return setSelectedService(state, action);
    default:
      return state;
  }
};

export default reducer;
