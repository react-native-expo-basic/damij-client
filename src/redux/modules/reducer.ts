import { combineReducers } from "redux";
import likes from "./likes";
import modalState from "./modal";
const reducer = combineReducers({
  likes,
  modal: modalState,
});

export default reducer;
