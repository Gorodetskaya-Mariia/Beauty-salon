import axios from "axios";
import { fetchServicesUrl } from "../../constants/urls";
import {
  FETCH_SERVICES_FAILED,
  FETCH_SERVICES_START,
  SET_SERVICES,
  SET_SELECTED_SERVICE,
  SET_SERVICE_FOR_BOOKING,
} from "./types";

export const servicesStart = () => {
  return {
    type: FETCH_SERVICES_START,
  };
};

export const setServices = (services) => {
  return {
    type: SET_SERVICES,
    services: services,
  };
};

export const fetchServicesFailed = () => {
  return {
    type: FETCH_SERVICES_FAILED,
  };
};

export const setSelectedService = (service, forWhom) => {
  return {
    type: SET_SELECTED_SERVICE,
    setSelectedService: service,
    forWhom: forWhom,
  };
};

export const setServiceForBooking = (service) => {
  return {
    type: SET_SERVICE_FOR_BOOKING,
    setServiceForBooking: service,
  };
};

export const initServices = () => (dispatch) => {
  dispatch(servicesStart());
  axios
    .get(fetchServicesUrl)
    .then((response) => JSON.stringify(response.data))
    .then((data) => {
      const result = JSON.parse(data);
      dispatch(setServices(result));
    })
    .catch((error) => {
      console.error(error);
      dispatch(fetchServicesFailed());
    });
};
