import * as ActionTypes from "../../actions/Types";

const initialState = {
  userInfo: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case ActionTypes.USER_LOGOUT:
      return {
        userInfo: {},
      };

    default:
      return state;
  }
};

export default UserReducer;
