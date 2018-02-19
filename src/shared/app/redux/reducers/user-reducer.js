import { Types } from '../constants/user-types';

const initialState = {
  firstName: null,
  lastName: null,
  login: null,
  sessionToken: null,
  expiresAt: null,
  email: null
};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case Types.UPDATE_NAME:
            return {...state, name: action.payload.name, email: action.payload.email}
        default:
            return state;
    }
}