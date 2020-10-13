import { combineReducers } from "redux";
import album from "./album/reducer";
import photo from "./photo/reducer";

export default combineReducers({
  album,
  photo,
});
