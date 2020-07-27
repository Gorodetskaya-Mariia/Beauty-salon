import axios from "axios";
import { updateObject } from "../../utilities/updateObject";
import {
  fetchAppointmentsUrl,
  createAppointmentsUrl,
} from "../../constants/urls";
import {
  FETCH_APPOINTMENTS_START,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAIL,
  CREATE_APPOINTMENT_START,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAIL,
  CLEAR_APPOINTMENTS,
} from "./types";

export const fetchAppointmentsStart = () => {
  return {
    type: FETCH_APPOINTMENTS_START,
  };
};
export const fetchAppointmentsSuccess = (appointments) => {
  return {
    type: FETCH_APPOINTMENTS_SUCCESS,
    appointments: appointments,
  };
};
export const fetchAppointmentsFail = (error) => {
  return {
    type: FETCH_APPOINTMENTS_FAIL,
    error: error,
  };
};

export const fetchAppointments = (token, userId) => async (dispatch) => {
  dispatch(fetchAppointmentsStart());
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  axios
    .get(fetchAppointmentsUrl + queryParams)
    .then((response) => JSON.stringify(response.data))
    .then((data) => {
      const result = JSON.parse(data);
      const fetchedAppointments = [];
      for (let key in result) {
        fetchedAppointments.push({
          ...result[key],
          id: key,
        });
      }
      dispatch(fetchAppointmentsSuccess(fetchedAppointments));
    })
    .catch((error) => {
      console.error(error);
      dispatch(fetchAppointmentsFail(error));
    });
};

export const createAppointmentStart = () => {
  return {
    type: CREATE_APPOINTMENT_START,
  };
};

export const createAppointmentSuccess = (id, formValues, userId) => {
  return {
    type: CREATE_APPOINTMENT_SUCCESS,
    appointmentId: id,
    appointmentData: formValues,
    userId: userId,
  };
};

export const createAppointmentFail = (error) => {
  return {
    type: CREATE_APPOINTMENT_FAIL,
    error: error,
  };
};

export const createAppointment = (formValues, userId, token) => async (
  dispatch
) => {
  const payload = updateObject(formValues, {
    userId: userId,
  });
  dispatch(createAppointmentStart());
  axios
    .post(createAppointmentsUrl + token, payload)
    .then((response) => {
      dispatch(
        createAppointmentSuccess(response.data.name, formValues, userId)
      );
    })
    .catch((error) => {
      dispatch(createAppointmentFail(error));
    });
};

export const clearAppointments = () => {
  return {
    type: CLEAR_APPOINTMENTS,
  };
};
