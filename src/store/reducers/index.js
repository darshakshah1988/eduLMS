import { combineReducers } from "redux";
import userInfo from "./userReducer";

const initialState = {
  sidebarShow: true,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const reducers = combineReducers({
  userInfo,
  changeState,
});

export default reducers;
