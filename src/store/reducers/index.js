import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import servicesReducer from "./servicesReducer";
import accountReducer from "./accountReducer";
import userDataReducer from "./userDataReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  services: servicesReducer,
  form: formReducer,
  userData: userDataReducer,
  account: accountReducer
});
