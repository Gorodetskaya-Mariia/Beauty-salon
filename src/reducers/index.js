import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import servicesReducer from "./servicesReducer";
import accountReducer from "./accountReducer";
import userDataReducer from "./userDataReducer";
import auth from "./auth";

export default combineReducers({
  auth: auth,
  services: servicesReducer,
	form: formReducer,
	userData: userDataReducer,
  account: accountReducer
});
