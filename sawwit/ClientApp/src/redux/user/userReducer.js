import { SET_USER, LOG_OUT_USER } from "./userTypes";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  console.log("state", state);
  console.log("initialState", initialState);
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case LOG_OUT_USER:
      //Different way to return a new state
      
      return Object.assign({}, state, { user: null });

    default:
      return state;
  }
};

export default userReducer;
