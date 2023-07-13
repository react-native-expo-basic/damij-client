import { combineReducers } from "redux";
import likes from "./likes";
import modal from "./modal";
import folder from "./folderReducer";
import auth from "./auth";
const reducer = combineReducers({
  likes,
  modal,
  folder,
  auth,
});

export default reducer;
