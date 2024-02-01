import isEmpty from "../../util/isEmpty";
// authReducer.js

import {setUser, setRole } from '../types';

const initialState = {
  user: {},
  isConnected: false,
  role: null, // Assurez-vous que la propriété role est initialisée correctement
};

export default function (state = initialState, action) {
  switch (action.type) {
   
      case setUser:
      return {
        ...state,
        isConnected: !isEmpty(action.payload),
        user: action.payload,
      };
    case setRole:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
}
