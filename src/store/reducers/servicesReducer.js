import * as actionTypes from "../actions/types";
import { updateObject } from "../../utilities/updateObject";

const initialState = {
  services: null,
  error: false,
  selectedService: null,
  loading: false,
  forWhom: null,
  setServiceForBooking: null,
};

const servicesStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const setServices = (state, action) => {
  return updateObject(state, {
    services: {
      men: action.services.men,
      women: action.services.women,
    },
    error: false,
    loading: false,
  });
};

const fetchServicesFailed = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const setSelectedService = (state, action) => {
  return updateObject(state, {
    selectedService: action.setSelectedService,
    forWhom: action.forWhom,
  });
};

const setServiceForBooking = (state, action) => {
  return updateObject(state, {
    setServiceForBooking: action.setServiceForBooking,
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
    case actionTypes.SET_SERVICE_FOR_BOOKING:
      return setServiceForBooking(state, action);
    default:
      return state;
  }
};

export default reducer;
