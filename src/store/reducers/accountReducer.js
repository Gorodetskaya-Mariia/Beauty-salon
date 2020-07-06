import * as actionTypes from "../actions/types";
import { updateObject } from "../../utilities/updateObject";

const initialState = {
  appointments: [],
  loading: false,
};

const fetchAppointmentsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchAppointmentsSuccess = (state, action) => {
  return updateObject(state, {
    appointments: action.appointments,
    loading: false,
  });
};

const fetchAppointmentsFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const createAppointmentStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const createAppointmentSuccess = (state, action) => {
  const newAppointment = updateObject(action.appointmentData, {
    id: action.appointmentId,
    userId: action.userId,
  });
  return updateObject(state, {
    loading: false,
    appointments: state.appointments.concat(newAppointment),
  });
};

const createAppointmentFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const clearAppointments = (state, action) => {
  return updateObject(state, initialState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_APPOINTMENT_START:
      return createAppointmentStart(state, action);
    case actionTypes.CREATE_APPOINTMENT_SUCCESS:
      return createAppointmentSuccess(state, action);
    case actionTypes.CREATE_APPOINTMENT_FAIL:
      return createAppointmentFail(state, action);
    case actionTypes.FETCH_APPOINTMENTS_START:
      return fetchAppointmentsStart(state, action);
    case actionTypes.FETCH_APPOINTMENTS_SUCCESS:
      return fetchAppointmentsSuccess(state, action);
    case actionTypes.FETCH_APPOINTMENTS_FAIL:
      return fetchAppointmentsFail(state, action);
    case actionTypes.CLEAR_APPOINTMENTS:
      return clearAppointments(state, action);
    default:
      return state;
  }
};

export default reducer;
