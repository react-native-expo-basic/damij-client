import { combineReducers } from "redux";
import likes from "./likes";
import modalState from "./modal";
import folder from "./folder";
const reducer = combineReducers({
  likes,
  modal: modalState,
  folder,
});

export default reducer;
